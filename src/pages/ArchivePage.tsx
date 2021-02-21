import {Col, Row} from 'react-bootstrap';

import PostListWithPageRouter from '../components/PostListWithPageRouter';

export default function ArchivePage(): JSX.Element {
  const postUrlFactory = (post: number) => {
    return `/post/${post}`;
  };

  return (
    <Row>
      <Col>
        <PostListWithPageRouter postUrlFactory={postUrlFactory} />
      </Col>
    </Row>
  );
}
