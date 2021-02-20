import {useHistory, useLocation} from 'react-router-dom';

import PostList from './PostList';

export default function PostListWithRouter(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
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

  const onNavigateToPage = (page: number) => {
    history.push(`${path}?page=${page}&itemsPerPage=${itemsPerPage}`);
  };

  return (
    <PostList
        page={page}
        itemsPerPage={itemsPerPage}
        searchTag={searchTag}
        onNavigateToPage={onNavigateToPage} />
  );
}
