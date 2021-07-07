import {GetStaticPathsResult, GetStaticPropsResult} from 'next';

import {getBlogConfig} from '../../api/config';
import {getNotionApi} from '../../api/notion';
import PageFrame from '../../components/PageFrame';
import PostCard from '../../components/PostCard';
import Pagination from '../../components/Pagination';
import {Post} from '../../utils/blog';
import {DEFAULT_TIMEOUT_SEC} from '../../utils/cache';
import paginate, {getNumPages} from '../../utils/pagination';

const ITEMS_PER_PAGE = 20;

function getPageLink(page: number): string {
  return `/archive/${page}`;
}

export interface ArchiveProps {
  page: number;
  numPages: number;
  view: Post[];
  totalNumPosts: number;
}

export default function Archive({page, numPages, view, totalNumPosts}: ArchiveProps) {
  const config = getBlogConfig();

  return (
      <PageFrame title="Archive">
        <div className="font-bold text-2xl dark:text-white my-8">
          {config.owner.nickname}&apos;s Blog Posts
        </div>
        <div>
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

export async function getStaticProps({params}: {params: NodeJS.Dict<string | string[]>}): Promise<GetStaticPropsResult<ArchiveProps>> {
  const page = parseInt(params.page as string);
  if (page <= 0) {
    return {
      notFound: true,
    };
  }

  const postsList = await getNotionApi().getPostsList();
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
    props: {page, numPages, view, totalNumPosts},
    revalidate: DEFAULT_TIMEOUT_SEC,
  };
}
