import {Col, Row} from 'react-bootstrap';

import PostList from '../components/PostList';

export default function Archive(): JSX.Element {
  return (
    <Row>
      <Col>
        <PostList />
      </Col>
    </Row>
  );
}
