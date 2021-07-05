import {CalendarIcon} from '@heroicons/react/outline';
import {GetStaticPathsResult, GetStaticPropsResult} from 'next';
import {ExtendedRecordMap} from 'notion-types';

import {getNotionApi, getPostSlug, Post} from '../../../../../api/notion';
import PageFrame, {PageTitle} from '../../../../../components/PageFrame';
import Tag from '../../../../../components/Tag';
import PostRenderer from '../../../../../components/PostRenderer';

export interface PostViewProps {
  post: Post;
  content: ExtendedRecordMap;
}

export default function PostView({content, post}: PostViewProps) {
  return (
      <PageFrame title={post.title}>
        <div className="mb-8">
          <div>
            <div className="inline-block mr-2">
              <Tag name={post.category} categoryTag />
            </div>
            {post.tags.map(tag => (
                <div key={tag} className="inline-block mr-1">
                  <Tag name={tag} />
                </div>
            ))}
          </div>

          <div className="my-3 font-bold text-4xl">
            {post.title}
          </div>

          <div className="text-sm text-gray-400 flex flex-nowrap items-center space-x-2 overflow-hidden">
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-5 h-5" />
              <span className="flex-shrink-0">{new Date(post.creationDate).toLocaleDateString()}</span>
            </div>
            {post.authors.map(author => (
                <div key={author.id} className="flex items-center space-x-1 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-6 h-6 rounded-full" src={author.profilePhoto} alt="Author's Profile Avatar" />
                  <span className="hidden md:block">{author.fullName}</span>
                </div>
            ))}
          </div>
        </div>

        <div>
          <PostRenderer content={content} />
        </div>
      </PageFrame>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const postsList = await getNotionApi().getPostsList();
  const paths: {params: NodeJS.Dict<string | string[]>}[] = [];

  for (const post of postsList) {
    const slug = getPostSlug(post);
    paths.push({
      params: {
        year: slug.date.getFullYear().toString(),
        month: slug.date.getMonth().toString(),
        day: slug.date.getDate().toString(),
        slugLabel: slug.label,
      },
    });
  }

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({params}: {params: NodeJS.Dict<string | string[]>}): Promise<GetStaticPropsResult<PostViewProps>> {
  const year = parseInt(params.year as string);
  const month = parseInt(params.month as string);
  const day = parseInt(params.day as string);
  const slugLabel = params.slugLabel as string;

  const notion = getNotionApi();
  const post = await notion.getPostBySlug({
    date: new Date(year, month, day),
    label: slugLabel,
  });
  if (post === null) {
    throw new Error("Cannot find a post with the given slug");
  }

  const content = await notion.getPostContent(post.id);

  return {
    props: {post, content},
  };
}
