import {Owner, isOwner} from './models';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function checkFailedResponse(response: Response) {
  if (response.status.toString()[0] === '5') {
    throw new Error(`Server responses with ${response.status}`);
  }
}

class SiriusDataStub {
  private readonly _serverUrl: string;

  public constructor(serverUrl: string) {
    this._serverUrl = serverUrl;
  }

  private sendRequest(method: RequestMethod, path: string, body?: any): Promise<void> {
    return fetch(this._serverUrl + path, {method, body})
        .then(response => checkFailedResponse(response));
  }

  private sendRequestAndGetData(method: RequestMethod, path: string): Promise<any> {
    return fetch(this._serverUrl + path, {method})
        .then(response => {
          checkFailedResponse(response);
          return response.json();
        });
  }

  public getOwnerInfo(): Promise<Owner> {
    return this.sendRequestAndGetData('GET', '/owner')
        .then(owner => {
          if (!isOwner(owner)) {
            throw Error("The fetched object from GET /owner is not a Owner object.");
          }
          return owner;
        });
  }
}

const stub = new SiriusDataStub('http://localhost:3025');

export default stub;
