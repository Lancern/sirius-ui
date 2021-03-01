import {Row, Col} from 'react-bootstrap';

import OwnerCard from '../components/OwnerCard';
import PostList from '../components/PostList';
import {PaginationUrlContextProvider} from '../context/url';

export default function HomePage(): JSX.Element {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <OwnerCard />
      </Col>
      <Col xs={12} lg={8}>
        <PaginationUrlContextProvider>
          <PostList />
        </PaginationUrlContextProvider>
      </Col>
    </Row>
  );
}
