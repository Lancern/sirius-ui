import {Col, Jumbotron, Row} from 'react-bootstrap';

import {PaginationUrlContextProvider} from '../context/url';
import PostList from "../components/PostList";

export default function ArchivePage(): JSX.Element {
  return (
    <Row>
      <Col>
        <Jumbotron>
          <h1>Archive</h1>
          <p>
            All blog posts are listed here
          </p>
        </Jumbotron>
        <PaginationUrlContextProvider>
          <PostList />
        </PaginationUrlContextProvider>
      </Col>
    </Row>
  );
}
