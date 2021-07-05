import {HashtagIcon} from '@heroicons/react/outline';
import {GetStaticPathsResult, GetStaticPropsResult} from 'next';

import {getNotionApi, Post} from '../../../api/notion';
import paginate, {getNumPages} from '../../../api/pagination';
import PageFrame, {PageTitle} from '../../../components/PageFrame';
import PostCard from '../../../components/PostCard';
import Pagination from '../../../components/Pagination';

const ITEMS_PER_PAGE = 20;

export interface CategoryPostsProps {
  category: string;
  page: number;
  numPages: number;
  view: Post[];
}

export default function CategoryPosts({category, page, numPages, view}: CategoryPostsProps) {
  const getPageLink = (p: number) => `/category/${category}/${p}`;

  return (
      <PageFrame title={category}>
        <PageTitle>
          <div className="inline-block p-2 rounded bg-gray-200 dark:bg-gray-700">
            <div className="inline-block w-5 h-5 mr-1"><HashtagIcon /></div>
            {category}
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
          <Pagination page={page} numPages={numPages} pageLink={getPageLink} />
        </div>
      </PageFrame>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const categoryDistribution = await getNotionApi().getCategoryDistribution();
  const paths: {params: NodeJS.Dict<string | string[]>}[] = [];

  categoryDistribution.forEach((numPosts, category) => {
    const numPages = getNumPages(numPosts, ITEMS_PER_PAGE);
    for (let i = 1; i <= numPages; ++i) {
      paths.push({
        params: {
          category,
          page: i.toString(),
        },
      });
    }
  });

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({params}: {params: NodeJS.Dict<string | string[]>}): Promise<GetStaticPropsResult<CategoryPostsProps>> {
  const category = params.category as string;
  const page = parseInt(params.page as string);

  const postsList = await getNotionApi().getPostsByCategory(category);
  const numPages = getNumPages(postsList.length, ITEMS_PER_PAGE);
  const view = paginate(postsList, {
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return {
    props: {category, page, numPages, view},
  };
}
