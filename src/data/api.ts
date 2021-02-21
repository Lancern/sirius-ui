import {Owner, PaginatedPostList, Post} from './models';

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

function checkFailedResponse(response: Response) {
  if (response.status.toString()[0] === '5') {
    throw new Error(`Server responses with ${response.status}`);
  }
}

interface RequestOptions {
  queries?: QueryParams;
  body?: any;
}

class SiriusDataStub {
  private readonly _serverUrl: string;

  public constructor(serverUrl: string) {
    this._serverUrl = serverUrl;
  }

  private sendRequest(method: RequestMethod, path: string, options?: RequestOptions): Promise<void> {
    const fetchInit = {
      method,
      body: options?.body,
    };
    return fetch(makeUrl(this._serverUrl, path, options?.queries), fetchInit)
        .then(response => checkFailedResponse(response));
  }

  private sendRequestAndGetData(method: RequestMethod, path: string, options?: RequestOptions): Promise<any> {
    const fetchInit = {
      method,
      body: options?.body,
    };
    return fetch(makeUrl(this._serverUrl, path, options?.queries), fetchInit)
        .then(response => {
          checkFailedResponse(response);
          return response.json();
        });
  }

  public getOwnerInfo(): Promise<Owner> {
    return this.sendRequestAndGetData('GET', '/owner');
  }

  public getPosts(filter?: { page?: number, itemsPerPage?: number, tags?: number[] }): Promise<PaginatedPostList> {
    const queries = filter ? toQueryParams(filter) : undefined;
    return this.sendRequestAndGetData('GET', '/posts', {queries});
  }

  public getPost(postId: number): Promise<Post> {
    return this.sendRequestAndGetData('GET', `/posts/${postId}`);
  }
}

const stub = new SiriusDataStub('http://localhost:3025');

export default stub;
