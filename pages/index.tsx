import Head from 'next/head'
import Image from 'next/image'

import {getNotionApi, Post} from '../api/notion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

export interface HomeProps {
  recentPosts: Post[];
}

export default function Home(props: HomeProps) {
  return (
      <>
        <Head>
          <title>Lancern&apos;s Blog</title>
          <meta name="description" content="Lancern&apos;s Personal Blog"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 justify-center flex-grow max-w-4xl">
            <Navbar/>

            <div className="my-16">
              <div className="inline-block shadow-lg rounded-full w-18 h-18">
                <Image className="rounded-full" src="/images/avatar.jpg" alt="avatar" width="100%" height="100%"/>
              </div>
              <div className="mt-8 text-2xl font-bold dark:text-white">Lancern&apos;s Blog</div>

              <div className="mt-12 leading-loose flex flex-col space-y-4 dark:text-white">
                {props.recentPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>

          <Footer/>
        </div>
      </>
  );
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  const notion = getNotionApi();
  const postsList = await notion.getPostsList();
  return {
    props: {
      recentPosts: postsList,
    },
  };
}
