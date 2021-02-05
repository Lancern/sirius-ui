export interface Owner {
  name: string;
  nickname: string;
  organization: string;
  location: string;
  avatarUrl: string;
  socialMedia: OwnerSocialMedia;
}

export interface OwnerSocialMedia {
  email?: string;
  github?: string;
  telegram?: string;
}

export function isOwner(obj: any): obj is Owner {
  if (typeof obj !== 'object') {
    return false;
  }
  if (!obj.name || typeof obj.name !== 'string') {
    return false;
  }
  if (!obj.nickname || typeof obj.nickname !== 'string') {
    return false;
  }
  if (!obj.organization || typeof obj.organization !== 'string') {
    return false;
  }
  if (!obj.location || typeof obj.location !== 'string') {
    return false;
  }
  if (!obj.avatarUrl || typeof obj.avatarUrl !== 'string') {
    return false;
  }
  if (!obj.socialMedia || typeof obj.socialMedia !== 'object') {
    return false;
  }
  return isOwnerSocialMedia(obj.socialMedia);
}

export function isOwnerSocialMedia(obj: any): obj is OwnerSocialMedia {
  if (typeof obj !== 'object') {
    return false;
  }
  if (obj.email && typeof obj.email !== 'string') {
    return false;
  }
  if (obj.github && typeof obj.github !== 'string') {
    return false;
  }
  if (obj.telegram && typeof obj.telegram !== 'string') {
    return false;
  }
  return true;
}
