import {Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';
import PostListWithPageRouter from '../components/PostListWithPageRouter';

function HomePage(): JSX.Element {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <OwnerCard />
      </Col>
      <Col xs={12} lg={8}>
        <PostListWithPageRouter
            postUrlFactory={(post: number) => `/post/${post}`}
            tagUrlFactory={(tag: number) => `/tag/${tag}`} />
      </Col>
    </Row>
  );
}

export default HomePage;
