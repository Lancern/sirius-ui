import Image from 'next/image'

import {getNotionApi, Post} from '../api/notion';
import PostCard from '../components/PostCard';
import PageFrame from "../components/PageFrame";

export interface HomeProps {
  recentPosts: Post[];
}

export default function Home(props: HomeProps) {
  return (
      <PageFrame>
        <div className="inline-block shadow-lg rounded-full w-18 h-18">
          <Image className="rounded-full" src="/images/avatar.jpg" alt="avatar" width="100%" height="100%"/>
        </div>
        <div className="mt-8 text-2xl font-bold dark:text-white">Lancern&apos;s Blog</div>

        <div className="mt-12 leading-loose flex flex-col space-y-4 dark:text-white">
          {props.recentPosts.map(post => (
              <PostCard key={post.id} post={post} />
          ))}
        </div>
      </PageFrame>
  );
}

export async function getStaticProps(): Promise<{props: HomeProps}> {
  const notion = getNotionApi();
  const postsList = await notion.getPostsList();
  return {
    props: {
      recentPosts: postsList,
    },
  };
}
