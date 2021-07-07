import {HashtagIcon} from '@heroicons/react/outline';
import {GetStaticPathsResult, GetStaticPropsResult} from 'next';

import {getNotionApi} from '../../../api/notion';
import PageFrame, {PageTitle} from '../../../components/PageFrame';
import PostCard from '../../../components/PostCard';
import Pagination from '../../../components/Pagination';
import {getCategoryPath, Post} from '../../../utils/blog';
import paginate, {getNumPages} from '../../../utils/pagination';

const ITEMS_PER_PAGE = 20;

export interface CategoryPostsProps {
  category: string;
  page: number;
  numPages: number;
  view: Post[];
  totalNumPosts: number;
}

export default function CategoryPosts({category, page, numPages, view, totalNumPosts}: CategoryPostsProps) {
  const getPageLink = (p: number) => getCategoryPath(category, page);

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

export function getStaticPaths(): Promise<GetStaticPathsResult> {
  return Promise.resolve({
    fallback: "blocking",
    paths: [],
  });
}

export async function getStaticProps({params}: {params: NodeJS.Dict<string | string[]>}): Promise<GetStaticPropsResult<CategoryPostsProps>> {
  const category = params.category as string;
  const page = parseInt(params.page as string);
  if (page <= 0) {
    return {
      notFound: true,
    };
  }

  const postsList = await getNotionApi().getPostsByCategory(category);
  if (postsList.length === 0) {
    return {
      notFound: true,
    };
  }

  const totalNumPosts = postsList.length;
  const numPages = getNumPages(totalNumPosts, ITEMS_PER_PAGE);
  if (page > numPages) {
    return {
      notFound: true,
    };
  }

  const view = paginate(postsList, {
    page,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return {
    props: {category, page, numPages, view, totalNumPosts},
  };
}
