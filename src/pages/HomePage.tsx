import {Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';
import PostListWithPageRouter from '../components/PostListWithPageRouter';

function HomePage(): JSX.Element {
  const postUrlFactory = (post: number) => {
    return `/post/${post}`;
  };

  return (
    <Row>
      <Col xs={12} lg={4}>
        <OwnerCard />
      </Col>
      <Col xs={12} lg={8}>
        <PostListWithPageRouter postUrlFactory={postUrlFactory} />
      </Col>
    </Row>
  );
}

export default HomePage;
