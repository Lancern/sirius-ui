import {Pagination} from 'react-bootstrap';

interface PaginatorProps {
  currentPage: number;
  maxPage: number;
  onNavigateToPage(page: number): void;
}

export default function Paginator(props: PaginatorProps): JSX.Element {
  const items: JSX.Element[] = [];

  items.push(
    <Pagination.First
        onClick={() => props.onNavigateToPage(0)}
        disabled={props.currentPage === 0} />
  );
  items.push(
    <Pagination.Prev
        onClick={() => props.onNavigateToPage(props.currentPage - 1)}
        disabled={props.currentPage === 0} />
  );

  if (props.currentPage - 2 > 0) {
    items.push(
      <Pagination.Item onClick={() => props.onNavigateToPage(0)}>
        0
      </Pagination.Item>
    );
    if (props.currentPage - 2 > 1) {
      items.push(
        <Pagination.Ellipsis disabled />
      )
    }
  }

  if (props.currentPage - 2 >= 0) {
    items.push(
      <Pagination.Item onClick={() => props.onNavigateToPage(props.currentPage - 2)}>
        {props.currentPage - 2}
      </Pagination.Item>
    );
  }
  if (props.currentPage - 1 >= 0) {
    items.push(
      <Pagination.Item onClick={() => props.onNavigateToPage(props.currentPage - 1)}>
        {props.currentPage - 1}
      </Pagination.Item>
    );
  }

  items.push(
    <Pagination.Item active>
      {props.currentPage}
    </Pagination.Item>
  );

  if (props.currentPage + 1 <= props.maxPage) {
    items.push(
      <Pagination.Item onClick={() => props.onNavigateToPage(props.currentPage + 1)}>
        {props.currentPage + 1}
      </Pagination.Item>
    );
  }
  if (props.currentPage + 2 <= props.maxPage) {
    items.push(
      <Pagination.Item onClick={() => props.onNavigateToPage(props.currentPage + 2)}>
        {props.currentPage + 2}
      </Pagination.Item>
    );
  }

  if (props.currentPage + 2 < props.maxPage - 1) {
    items.push(
      <Pagination.Ellipsis disabled />
    );
  }

  items.push(<Pagination.Next disabled={props.currentPage === props.maxPage} />);
  items.push(<Pagination.Last disabled={props.currentPage === props.maxPage} />);

  return (
    <Pagination>
      {items}
    </Pagination>
  );
}
