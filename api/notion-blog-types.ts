export interface Slug {
  date: Date;
  label: string;
}

export interface SlugPathParams {
  year: string;
  month: string;
  day: string;
  slugLabel: string;
}

export function getSlugPathParams(slug: Slug): SlugPathParams {
  return {
    year: slug.date.getFullYear().toString(),
    month: (slug.date.getMonth() + 1).toString(),
    day: slug.date.getDate().toString(),
    slugLabel: slug.label,
  };
}

export function isSameSlug(lhs: Slug, rhs: Slug): boolean {
  return lhs.label === rhs.label;
}

export function formatSlug(slug: Slug): string {
  const {year, month, day, slugLabel} = getSlugPathParams(slug);
  return `${year}/${month}/${day}/${slugLabel}`;
}

export function getPostSlug(post: Post): Slug {
  return {
    date: new Date(post.creationDate),
    label: post.slugLabel,
  };
}

export interface Post {
  id: string;
  title: string;
  slugLabel: string;
  top: boolean;
  category: string;
  tags: string[];
  creationDate: string;
  authors: Author[];
  brief: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  profilePhoto?: string;
}

export interface Friend {
  id: string;
  name: string;
  brief: string;
  avatarUrl: string;
  link: string;
}
