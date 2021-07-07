import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

import {getNotionApi} from '../api/notion';
import {generateRssFeed} from '../utils/feed';

export default function Feed() { return null; }

export async function getServerSideProps({res}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const posts = await getNotionApi().getPostsList();
  const rssFeed = generateRssFeed(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(rssFeed);
  res.end();

  return {
    props: {},
  };
}
