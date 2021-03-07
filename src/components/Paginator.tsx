import {Pagination} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import {usePaginationUrl} from 'context/url';

export interface PaginatorProps {
  maxPage: number;
}

export default function Paginator(props: PaginatorProps): JSX.Element {
  const history = useHistory();
  const paginationUrl = usePaginationUrl();
  const items: JSX.Element[] = [];

  const navigateToPage = (page: number) => {
    const url = paginationUrl.getPageUrl(page, paginationUrl.itemsPerPage);
    history.push(url);
  };

  const {page} = paginationUrl;

  items.push(
    <Pagination.First
        onClick={() => navigateToPage(0)}
        disabled={page === 0} />
  );
  items.push(
    <Pagination.Prev
        onClick={() => navigateToPage(page - 1)}
        disabled={page === 0} />
  );

  if (page - 2 > 0) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(0)}>
        0
      </Pagination.Item>
    );
    if (page - 2 > 1) {
      items.push(
        <Pagination.Ellipsis disabled />
      )
    }
  }

  if (page - 2 >= 0) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(page - 2)}>
        {page - 2}
      </Pagination.Item>
    );
  }
  if (page - 1 >= 0) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(page - 1)}>
        {page - 1}
      </Pagination.Item>
    );
  }

  items.push(
    <Pagination.Item active>
      {page}
    </Pagination.Item>
  );

  if (page + 1 <= props.maxPage) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(page + 1)}>
        {page + 1}
      </Pagination.Item>
    );
  }
  if (page + 2 <= props.maxPage) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(page + 2)}>
        {page + 2}
      </Pagination.Item>
    );
  }

  if (page + 2 < props.maxPage - 1) {
    items.push(
      <Pagination.Ellipsis disabled />
    );
  }

  items.push(<Pagination.Next disabled={page === props.maxPage} />);
  items.push(<Pagination.Last disabled={page === props.maxPage} />);

  return (
    <Pagination>
      {items}
    </Pagination>
  );
}
