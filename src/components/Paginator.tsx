import {Pagination} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export interface PaginatorProps {
  currentPage: number;
  maxPage: number;

  pageUrlFactory: (page: number) => string;
}

export default function Paginator(props: PaginatorProps): JSX.Element {
  const history = useHistory();
  const items: JSX.Element[] = [];

  const navigateToPage = (page: number) => {
    const url = props.pageUrlFactory(page);
    history.push(url);
  };

  items.push(
    <Pagination.First
        onClick={() => navigateToPage(0)}
        disabled={props.currentPage === 0} />
  );
  items.push(
    <Pagination.Prev
        onClick={() => navigateToPage(props.currentPage - 1)}
        disabled={props.currentPage === 0} />
  );

  if (props.currentPage - 2 > 0) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(0)}>
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
      <Pagination.Item onClick={() => navigateToPage(props.currentPage - 2)}>
        {props.currentPage - 2}
      </Pagination.Item>
    );
  }
  if (props.currentPage - 1 >= 0) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(props.currentPage - 1)}>
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
      <Pagination.Item onClick={() => navigateToPage(props.currentPage + 1)}>
        {props.currentPage + 1}
      </Pagination.Item>
    );
  }
  if (props.currentPage + 2 <= props.maxPage) {
    items.push(
      <Pagination.Item onClick={() => navigateToPage(props.currentPage + 2)}>
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
