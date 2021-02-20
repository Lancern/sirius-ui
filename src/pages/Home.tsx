import {Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';
import PostList from '../components/PostList';

function Home(): JSX.Element {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <OwnerCard />
      </Col>
      <Col xs={12} lg={8}>
        <PostList />
      </Col>
    </Row>
  );
}

export default Home;
