import {Feed} from 'feed';

import {getPostPath, Post} from './blog';
import {getBlogConfig} from '../api/config';

function generateFeed(postsList: Post[]): Feed {
  let updateDate: Date | undefined = undefined;
  if (postsList.length > 0) {
    updateDate = new Date(postsList[0].creationDate);
    for (let i = 1; i < postsList.length; ++i) {
      const postDate = new Date(postsList[i].creationDate);
      if (postDate > updateDate) {
        updateDate = postDate;
      }
    }
  }

  const blogConfig = getBlogConfig();

  const feed = new Feed({
    title: blogConfig.title,
    description: blogConfig.description,
    id: blogConfig.domain,
    link: blogConfig.domain,
    favicon: `${blogConfig.domain}/favicon.ico`,
    copyright: blogConfig.copyright,
    updated: updateDate,
    author: {
      name: blogConfig.owner.name,
      email: blogConfig.owner.email,
      link: blogConfig.domain,
    },
  });

  for (const post of postsList) {
    const postUrl = blogConfig.domain + getPostPath(post);
    const authors = post.authors.map(author => ({
      name: author.fullName,
    }));
    feed.addItem({
      title: post.title,
      description: post.brief,
      guid: post.id,
      link: postUrl,
      date: new Date(post.creationDate),
      author: authors,
    });
  }

  return feed;
}

export function generateRssFeed(postsList: Post[]): string {
  return generateFeed(postsList).rss2();
}
