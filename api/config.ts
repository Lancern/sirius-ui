import getConfig from 'next/config';

export interface BlogConfig {
  domain: string;
  title: string;
  description: string;
  copyright: string;
  owner: BlogOwner;
}

export interface BlogOwner {
  name: string;
  nickname: string;
  email: string;
}

export function getBlogConfig(): BlogConfig {
  return getConfig().publicRuntimeConfig;
}
