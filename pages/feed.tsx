import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

import {getNotionApi} from '../api/notion';
import {CacheBox, DEFUALT_TIMEOUT_MILLISEC} from '../utils/cache';
import {generateRssFeed} from '../utils/feed';

export default function Feed() { return null; }

async function getFeed(): Promise<string> {
  const posts = await getNotionApi().getPostsList();
  return generateRssFeed(posts);
}

const RSS_CACHE = new CacheBox<string>(DEFUALT_TIMEOUT_MILLISEC, getFeed);

export async function getServerSideProps({res}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const rssFeed = await RSS_CACHE.get();

  res.setHeader("Content-Type", "text/xml");
  res.write(rssFeed);
  res.end();

  return {
    props: {},
  };
}
