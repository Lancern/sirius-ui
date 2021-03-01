import {Col, Row} from 'react-bootstrap';

import PostEditor from '../../components/PostEditor';

export default function NewPostPage(): JSX.Element {
  return (
    <Row className="justify-content-center">
      <Col>
        <PostEditor />
      </Col>
    </Row>
  );
}
