import {AuthSession, Owner, PaginatedPostList, Post, PostTag} from './models';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type QueryParams = Map<string, string>;

function toQueryParams(obj: object): QueryParams {
  function toQueryValue(obj: any): string {
    switch (typeof obj) {
      case "boolean":
        return obj ? 'true' : 'false';
      case 'number':
      case 'bigint':
        return obj.toString();
      case 'string':
        return obj;
      case 'object':
        if (Array.isArray(obj)) {
          return obj.join(',');
        }
        break;
    }
    throw new Error('Invalid query value type');
  }

  const queries = new Map<string, string>();
  for (const [key, value] of Object.entries(obj)) {
    if (!obj.hasOwnProperty(key) || value === undefined) {
      continue;
    }

    queries.set(key, toQueryValue(value));
  }

  return queries;
}

function makeUrl(base: string, path: string, queries?: QueryParams): string {
  const url = new URL(base + path);

  if (queries) {
    queries.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
}

function checkErrorResponse(response: Response, treatNonOkAsError?: boolean) {
  const statusCodeText = response.status.toString();
  if (statusCodeText[0] === '5') {
    throw new Error(`Server responses with ${response.status}`);
  }
  if (treatNonOkAsError && statusCodeText[0] !== '2') {
    throw new Error(`Server responses with ${response.status}`);
  }
}

interface RequestOptions {
  queries?: QueryParams;
  headers?: Headers;
  body?: any;
  treatNonOkAsError?: boolean;
}

export interface ApiResponse<T = undefined> {
  status: number;
  statusText: string;
  data?: T;
}

export class SiriusApi {
  private readonly _host: string;

  public constructor(host: string) {
    this._host = host;
  }

  private fetch<T>(method: RequestMethod, path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    let body: string | undefined = undefined;
    if (options?.body) {
      body = JSON.stringify(options.body);
    }

    const fetchOptions = {
      method,
      body,
      headers: options?.headers,
    };

    return fetch(makeUrl(this._host, path, options?.queries), fetchOptions)
        .then(response => {
          checkErrorResponse(response, options?.treatNonOkAsError);

          const {status, statusText} = response;
          return new Promise<ApiResponse<T>>(resolve => {
            response.json()
                .then(data => {
                  resolve({status, statusText, data});
                }, () => {
                  resolve({status, statusText});
                });
          });
        });
  }

  private adminFetch<T>(method: RequestMethod, path: string, token: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    const headers = options?.headers ?? new Headers();
    headers.set("X-Sirius-Token", token);

    if (!options) {
      options = {headers};
    } else if (!options.headers) {
      options.headers = headers;
    }

    return this.fetch<T>(method, path, options);
  }

  public getOwnerInfo(): Promise<ApiResponse<Owner>> {
    return this.fetch('GET', '/owner');
  }

  public getPosts(filter?: { page?: number, itemsPerPage?: number, tags?: number[] }): Promise<ApiResponse<PaginatedPostList>> {
    const queries = filter ? toQueryParams(filter) : undefined;
    return this.fetch('GET', '/posts', {
      queries,
      treatNonOkAsError: true,
    });
  }

  public getPost(postId: number): Promise<ApiResponse<Post>> {
    return this.fetch('GET', `/posts/${postId}`, {
      treatNonOkAsError: true,
    });
  }

  public getTags(): Promise<ApiResponse<PostTag[]>> {
    return this.fetch('GET', '/tags', {
      treatNonOkAsError: true,
    });
  }

  public getTag(tagId: number): Promise<ApiResponse<PostTag>> {
    return this.fetch('GET', `/tags/${tagId}`, {
      treatNonOkAsError: true,
    });
  }

  public signIn(password: string): Promise<ApiResponse<AuthSession>> {
    return this.fetch('POST', '/auth', {
      body: {password}
    });
  }
}
