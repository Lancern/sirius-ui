import {Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';
import PostListWithRouter from '../components/PostListWithRouter';

function HomePage(): JSX.Element {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <OwnerCard />
      </Col>
      <Col xs={12} lg={8}>
        <PostListWithRouter />
      </Col>
    </Row>
  );
}

export default HomePage;
