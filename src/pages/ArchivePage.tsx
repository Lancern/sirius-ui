import {Col, Row} from 'react-bootstrap';

import PostListWithRouter from '../components/PostListWithRouter';

export default function ArchivePage(): JSX.Element {
  return (
    <Row>
      <Col>
        <PostListWithRouter />
      </Col>
    </Row>
  );
}
