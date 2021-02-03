export interface Owner {
  name: string;
  nickname: string;
  organization: string;
  avatarUrl: string;
}

export function isOwner(obj: any): obj is Owner {
  if (!obj.name || typeof obj.name !== 'string') {
    return false;
  }
  if (!obj.nickname || typeof obj.nickname !== 'string') {
    return false;
  }
  if (!obj.organization || typeof obj.organization !== 'string') {
    return false;
  }
  if (!obj.avatarUrl || typeof obj.avatarUrl !== 'string') {
    return false;
  }
  return true;
}
