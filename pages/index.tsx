import {GetStaticPropsResult} from 'next';
import Image from 'next/image'

import {getNotionApi, Post} from '../api/notion';
import Card from '../components/Card';
import PostCard from '../components/PostCard';
import PageFrame, {PageTitle} from "../components/PageFrame";
import paginate from '../api/pagination';

const RECENT_POSTS_COUNT = 10;

export interface HomeProps {
  recentPosts: Post[];
}

export default function Home(props: HomeProps) {
  return (
      <PageFrame>
        <div className="inline-block shadow-lg rounded-full w-18 h-18">
          <Image className="rounded-full" src="/images/avatar.jpg" alt="avatar" width="100%" height="100%"/>
        </div>
        <PageTitle>Lancern&apos;s Blog</PageTitle>

        <div className="mt-12 leading-loose flex flex-col space-y-4 dark:text-white">
          {props.recentPosts.map(post => (
              <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex mt-4">
          <Card href="/archive/1" className="flex-grow" compact>
            <div className="flex justify-center text-gray-500">
              More Posts
            </div>
          </Card>
        </div>
      </PageFrame>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const notion = getNotionApi();
  const postsList = await notion.getPostsList();
  const recentPosts = paginate(postsList, {
    page: 1,
    itemsPerPage: RECENT_POSTS_COUNT,
  });
  return {
    props: {
      recentPosts: recentPosts,
    },
  };
}
