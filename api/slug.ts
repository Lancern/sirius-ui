import { Post } from './notion';

export interface Slug {
  date: Date;
  label: string;
};

export function formatSlug(slug: Slug): string {
  const year = slug.date.getFullYear();
  const month = slug.date.getMonth();
  const day = slug.date.getDay();
  const { label } = slug;
  return `/${year}/${month}/${day}/${label}`;
};

export function formatPostSlug(post: Post): string {
  if (!post.slugLabel) {
    throw new Error("The given post does not have a slug label");
  }
  if (!post.creationDate) {
    throw new Error("The given post does not have a creation date");
  }

  const date = new Date(post.creationDate);
  const label = post.slugLabel;

  return formatSlug({ date, label })
};
