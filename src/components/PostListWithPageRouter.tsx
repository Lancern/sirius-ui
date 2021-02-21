import {useLocation} from 'react-router-dom';

import PostList from './PostList';

function getIntQueryOrDefault<D>(query: URLSearchParams, name: string, defaultValue: D): number | D {
  if (!query.has(name)) {
    return defaultValue;
  }

  const value = parseInt(query.get(name) as string);
  if (!Number.isInteger(value)) {
    return defaultValue;
  }

  return value;
}

export interface PostListWithPageRouterProps {
  searchTag?: number;

  postUrlFactory: (post: number) => string;
  tagUrlFactory: (tag: number) => string;
}

export default function PostListWithPageRouter(props: PostListWithPageRouterProps): JSX.Element {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const page = getIntQueryOrDefault(query, 'page', 0);
  const itemsPerPage = getIntQueryOrDefault(query, 'itemsPerPage', 20);

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
        searchTag={props.searchTag}
        pageUrlFactory={pageUrlFactory}
        postUrlFactory={props.postUrlFactory}
        tagUrlFactory={props.tagUrlFactory} />
  );
}
