import {Col, Row} from 'react-bootstrap';

import PostListWithPageRouter from '../components/PostListWithPageRouter';

export default function ArchivePage(): JSX.Element {
  return (
    <Row>
      <Col>
        <PostListWithPageRouter
            postUrlFactory={(post: number) => `/post/${post}`}
            tagUrlFactory={(tag: number) => `/tag/${tag}`} />
      </Col>
    </Row>
  );
}
