import {createContext, PropsWithChildren, useContext} from 'react';
import {useLocation} from 'react-router-dom';

export interface UrlContext {
  signInUrl: string;
  adminUrl: string;

  getPostUrl(postId: number): string;
  getTagUrl(tagId: number): string;
}

const urlContext = createContext<UrlContext>({
  signInUrl: '/admin/login',
  adminUrl: '/admin',

  getPostUrl(postId: number): string {
    return `/post/${postId}`;
  },

  getTagUrl(tagId: number): string {
    return `/tag/${tagId}`;
  },
});

export function useUrl(): UrlContext {
  return useContext(urlContext);
}

export interface PaginationUrlContext {
  page: number;
  itemsPerPage: number;

  getPageUrl(page: number, itemsPerPage: number): string;
}

const defaultPage = 0;
const defaultItemsPerPage = 20;

const paginationUrlContext = createContext<PaginationUrlContext>({
  page: defaultPage,
  itemsPerPage: defaultItemsPerPage,

  getPageUrl(): string {
    throw new Error('Default implementation of PaginationUrlContext cannot be used');
  },
});

export function usePaginationUrl(): PaginationUrlContext {
  return useContext(paginationUrlContext);
}

export function PaginationUrlContextProvider(props: PropsWithChildren<{}>): JSX.Element {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const page = getIntQueryOrDefault(query, 'page', 0);
  const itemsPerPage = getIntQueryOrDefault(query, 'itemsPerPage', 20);

  const context = {
    page,
    itemsPerPage,

    getPageUrl(page: number): string {
      const path = location.pathname;
      const query = new URLSearchParams(location.search);

      query.set('page', page.toString());

      const queryString = query.toString();
      return `${path}?${queryString}`;
    }
  };

  return (
    <paginationUrlContext.Provider value={context}>
      {props.children}
    </paginationUrlContext.Provider>
  );
}

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
