import {TagIcon} from '@heroicons/react/outline';

import {GetStaticPathsResult, GetStaticPropsResult} from 'next';

import {getNotionApi} from '../../../api/notion';
import PageFrame, {PageTitle} from '../../../components/PageFrame';
import Pagination from '../../../components/Pagination';
import PostCard from '../../../components/PostCard';
import {getTagPath, Post} from '../../../utils/blog';
import paginate, {getNumPages} from '../../../utils/pagination';

const ITEMS_PER_PAGE = 20;

export interface TagPostsProps {
  tag: string;
  page: number;
  numPages: number;
  view: Post[];
  totalNumPosts: number;
}

export default function TagPosts({tag, page, numPages, view, totalNumPosts}: TagPostsProps) {
  const getPageLink = (p: number) => getTagPath(tag, page);

  return (
      <PageFrame title={tag}>
        <PageTitle>
          <div className="inline-block p-2 rounded bg-gray-200 dark:bg-gray-700">
            <div className="inline-block w-5 h-5 mr-1"><TagIcon /></div>
            {tag}
          </div>
        </PageTitle>
        <div className="flex flex-col dark:text-white">
          {view.map(post => (
              <div key={post.id} className="my-4">
                <PostCard post={post} />
              </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
              page={page}
              numPages={numPages}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={totalNumPosts}
              pageLink={getPageLink} />
        </div>
      </PageFrame>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const tagDistribution = await getNotionApi().getTagDistribution();
  const paths: {params: NodeJS.Dict<string | string[]>}[] = [];

  tagDistribution.forEach((numPosts, tag) => {
    const numPages = getNumPages(numPosts, ITEMS_PER_PAGE);
    for (let i = 1; i <= numPages; ++i) {
      paths.push({
        params: {
          tag,
          page: i.toString(),
        }
      });
    }
  });

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({params}: {params: NodeJS.Dict<string | string[]>}): Promise<GetStaticPropsResult<TagPostsProps>> {
  const tag = params.tag as string;
  const page = parseInt(params.page as string);

  const postsList = await getNotionApi().getPostsByTag(tag);
  const totalNumPosts = postsList.length;
  const numPages = getNumPages(totalNumPosts, ITEMS_PER_PAGE);
  const view = paginate(postsList, {
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return {
    props: {tag, page, numPages, view, totalNumPosts},
  };
}
