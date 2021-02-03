import {Container, Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';

function Home(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col xs={12} lg={4}>
          <OwnerCard />
        </Col>
        <Col xs={12} lg={8}>
          This is blog post list
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
