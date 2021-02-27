import {Col, Jumbotron, Row} from 'react-bootstrap';

import PostListWithPageRouter from '../components/PostListWithPageRouter';

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
        <PostListWithPageRouter
            postUrlFactory={(post: number) => `/post/${post}`}
            tagUrlFactory={(tag: number) => `/tag/${tag}`} />
      </Col>
    </Row>
  );
}
