export interface Post {
  id: string;
  title: string;
  slugLabel: string;
  top: boolean;
  category: string;
  tags: string[];
  creationDate: string;
  authors: Author[];
  brief: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePhoto?: string;
}

function comparePosts(lhs: Post, rhs: Post): number {
  if (lhs === rhs) {
    return 0;
  }

  if (lhs.top && !rhs.top) {
    return -1;
  } else if (!lhs.top && rhs.top) {
    return 1;
  }

  if (lhs.creationDate < rhs.creationDate) {
    return -1;
  } else if (lhs.creationDate == rhs.creationDate) {
    return 0;
  } else {
    return 1;
  }
}

interface PostTableEntry {
  id: string;
  title?: string;
  slugLabel?: string;
  published?: boolean;
  top?: boolean;
  category?: string;
  tags?: string[];
  creationDate?: string;
  authors?: Author[];
  brief?: string;
}

function isValidPostEntry(entry: PostTableEntry): boolean {
  return entry.title !== undefined &&
      entry.slugLabel !== undefined &&
      entry.creationDate !== undefined &&
      entry.authors !== undefined;
}

function isPublishedPost(entry: PostTableEntry): boolean {
  return isValidPostEntry(entry) && entry.published !== undefined && entry.published;
}

function toPost(entry: PostTableEntry): Post {
  return {
    id: entry.id,
    title: entry.title!,
    slugLabel: entry.slugLabel!,
    top: entry.top ?? false,
    category: entry.category!,
    tags: entry.tags!,
    creationDate: entry.creationDate!,
    authors: entry.authors!,
    brief: entry.brief!,
  };
}

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  link: string;
}

function compareFriends(lhs: Friend, rhs: Friend): number {
  if (lhs.name < rhs.name) {
    return -1;
  } else if (lhs.name === rhs.name) {
    return 0;
  } else {
    return 1;
  }
}

interface FriendsTableEntry {
  id: string;
  name?: string;
  avatarUrl?: string;
  link?: string;
}

function isValidFriendEntry(entry: FriendsTableEntry): boolean {
  return entry.name !== undefined && entry.avatarUrl !== undefined && entry.link !== undefined;
}

function toFriend(entry: FriendsTableEntry): Friend {
  return {
    id: entry.id,
    name: entry.name!,
    avatarUrl: entry.avatarUrl!,
    link: entry.link!,
  }
}

export interface NotionApi {
  getPostsList(): Promise<Post[]>;

  getPostContent(id: string): Promise<any>;

  getFriendsList(): Promise<Friend[]>;
}

const NOTION_WEB_API_BASE_URL = "https://notion-api.splitbee.io/v1";

class NotionWebApi implements NotionApi {
  private readonly _postsTableId: string;
  private readonly _friendsTableId?: string;
  private _authToken: string | null;

  public constructor(postsTableId: string, friendsTableId?: string) {
    this._postsTableId = postsTableId;
    this._friendsTableId = friendsTableId;
    this._authToken = null;
  }

  public setAuthToken(authToken: string) {
    this._authToken = authToken;
  }

  public async getPostsList(): Promise<Post[]> {
    const entries = await this.getPrimaryTableEntries();
    return entries.filter(isPublishedPost).map(toPost).sort(comparePosts)
  }

  public getPostContent(id: string): Promise<any> {
    return this.getPageContent<any>(id);
  }

  public async getFriendsList(): Promise<Friend[]> {
    const entries = await this.getFriendsTableEntries();
    return entries.filter(isValidFriendEntry).map(toFriend).sort(compareFriends);
  }

  protected getTableEntries<T>(tableId: string): Promise<T[]> {
    return this.sendRequest<T[]>(`/table/${tableId}`, "GET");
  }

  protected getPageContent<T>(pageId: string): Promise<T> {
    return this.sendRequest<T>(`/page/${pageId}`, "GET");
  }

  private getPrimaryTableEntries(): Promise<PostTableEntry[]> {
    return this.getTableEntries<PostTableEntry>(this._postsTableId);
  }

  private async getFriendsTableEntries(): Promise<FriendsTableEntry[]> {
    if (!this._friendsTableId) {
      return [];
    }

    return await this.getTableEntries<FriendsTableEntry>(this._friendsTableId);
  }

  private async sendRequest<T>(path: string, method: string): Promise<T> {
    const fetchOptions: RequestInit = {method};
    if (this._authToken) {
      fetchOptions.headers = {
        Authorization: `Bearer ${this._authToken}`,
      };
    }

    const response = await fetch(NOTION_WEB_API_BASE_URL + path, fetchOptions);
    return response.json();
  }
}

type PromiseHandle<T> = [
  (value: T | PromiseLike<T>) => void,
  (reason?: any) => void,
];

interface CacheBox<T> {
  value?: T;
  isFetching: boolean;
  waitList: PromiseHandle<T>[];
}

class NotionCachedApi extends NotionWebApi {
  private readonly _cachedTables: Map<string, CacheBox<any>>;
  private readonly _cachedPages: Map<string, CacheBox<any>>;

  public constructor(primaryTableId: string) {
    super(primaryTableId);

    this._cachedTables = new Map<string, CacheBox<any>>();
    this._cachedPages = new Map<string, CacheBox<any>>();
  }

  protected getTableEntries<T>(tableId: string): Promise<T[]> {
    return this.getCacheOrFetch<T[]>(this._cachedTables, tableId, id => super.getTableEntries(id));
  }

  protected getPageContent<T>(pageId: string): Promise<T> {
    return this.getCacheOrFetch<T>(this._cachedPages, pageId, id => super.getPageContent(id));
  }

  private getCacheOrFetch<T>(cache: Map<string, CacheBox<any>>, id: string, fetcher: (id: string) => Promise<T>): Promise<T> {
    if (cache.has(id)) {
      let cacheBox = cache.get(id)!;
      if (!cacheBox.isFetching) {
        return Promise.resolve(cacheBox.value)!;
      }
      return new Promise<T>((resolve, reject) => {
        cacheBox.waitList.push([resolve, reject]);
      });
    }

    const cacheBox: CacheBox<T> = {
      isFetching: true,
      waitList: [],
    };
    cache.set(id, cacheBox);

    const resolveAllWaitingPromises = (result: T) => {
      for (const [resolve, _] of cacheBox.waitList) {
        resolve(result);
      }
      cache.delete(id);
    };

    const rejectAllWaitingPromises = (reason?: any) => {
      for (const [_, reject] of cacheBox.waitList) {
        reject(reason);
      }
      cache.delete(id);
    };

    return fetcher(id)
        .then(result => {
          cacheBox.value = result;
          cacheBox.isFetching = false;
          resolveAllWaitingPromises(result);
          return result;
        }).catch(err => {
          rejectAllWaitingPromises(err);
          cache.delete(id);
          return Promise.reject(err);
        });
  }
}

let notion: NotionCachedApi | null = null;

function initNotionApi(): NotionApi {
  const postsListPageId = process.env.NOTION_POSTS_LIST_PAGE_ID;
  if (!postsListPageId) {
    throw new Error("The NOTION_POSTS_LIST_PAGE_ID env variable is not set");
  }

  notion = new NotionCachedApi(postsListPageId);
  const authToken = process.env.NOTION_AUTH_TOKEN;
  if (authToken) {
    notion.setAuthToken(authToken);
  }

  return notion;
}

export function getNotionApi(): NotionApi {
  if (notion === null) {
    return initNotionApi();
  }

  return notion;
}
