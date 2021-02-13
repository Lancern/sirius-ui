import {Container, Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';
import PostList from '../components/PostList';

function Home(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <OwnerCard />
        </Col>
        <Col xs={12} lg={8}>
          <PostList />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
