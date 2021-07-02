const BASE_URL = "https://notion-api.splitbee.io/v1";

export interface Post {
  id: string;
  title?: string;
  slugLabel?: string;
  published?: boolean;
  top?: boolean;
  category?: string;
  tags?: string[];
  creationDate?: string;
  authors?: Author[];
};

export interface Author {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  profilePhoto?: string;
};

export class NotionAPI {
  public constructor() {
    this._authToken = null;
  }

  public setAuthToken(authToken: string) {
    this._authToken = authToken;
  }

  public async getPostsList(pageId: string): Promise<Post[]> {
    return await this.sendRequest<Post[]>(`/table/${pageId}`, "GET");
  }

  public async getPostContent(pageId: string): Promise<any> {
    return await this.sendRequest<any>(`/page/${pageId}`, "GET");
  }

  private async sendRequest<T>(path: string, method: string): Promise<T> {
    const fetchOptions: RequestInit = { method };
    if (this._authToken) {
      fetchOptions.headers = {
        Authorization: `Bearer ${this._authToken}`,
      };
    }

    const response = await fetch(BASE_URL + path, fetchOptions);
    return response.json();
  }

  private _authToken: string | null;
};
