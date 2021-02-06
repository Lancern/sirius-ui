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

export interface PaginatedPostList {
  count: number;
  posts: Post[];
}

export interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  tags: PostTag[];
  content: string;
}

export interface PostTag {
  id: number;
  name: string;
}
