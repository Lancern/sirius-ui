const hitokotoHost: string = 'https://v1.hitokoto.cn';

export interface HitokotoResponse {
  id: number;
  uuid: string;
  hitokoto: string;
  type: string;
  from: string;
  from_who: string;
  creator: string;
  creator_uid: number;
  reviewer: number;
  commit_from: string;
  created_at: string;
  length: number;
}

export class HitokotoApi {
  public getHitokoto(): Promise<HitokotoResponse> {
    return fetch(hitokotoHost, {
      method: 'GET',
      mode: 'cors',
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Hitokoto server replies with ${response.status}`);
      }
      return response.json()
    });
  }
}
