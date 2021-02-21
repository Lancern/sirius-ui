import {useLocation} from 'react-router-dom';

import PostList from './PostList';

interface PostListWithRouterProps {
  postUrlFactory: (post: number) => string;
}

export default function PostListWithPageRouter(props: PostListWithRouterProps): JSX.Element {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const getIntQuery = (name: string, defaultValue: number): number => {
    if (!query.has(name)) {
      return defaultValue;
    }

    const value = parseInt(query.get(name) as string);
    if (!Number.isInteger(value)) {
      return defaultValue;
    }

    return value;
  };

  const page = getIntQuery('page', 0);
  const itemsPerPage = getIntQuery('itemsPerPage', 20);
  const searchTag = query.get('tag') ?? undefined;

  const pageUrlFactory = (page: number) => {
    const path = location.pathname;
    const query = new URLSearchParams(location.search);

    query.set('page', page.toString());

    const queryString = query.toString();
    return `${path}?${queryString}`;
  };

  return (
    <PostList
        page={page}
        itemsPerPage={itemsPerPage}
        searchTag={searchTag}
        pageUrlFactory={pageUrlFactory}
        postUrlFactory={props.postUrlFactory} />
  );
}
