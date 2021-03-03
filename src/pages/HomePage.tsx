import {Row, Col} from 'react-bootstrap';

import Hitokoto from '../components/Hitokoto';
import OwnerCard from '../components/OwnerCard';
import PostList from '../components/PostList';
import {PaginationUrlContextProvider} from '../context/url';

export default function HomePage(): JSX.Element {
  return (
    <Row>
      <Col xs={12} lg={4}>
        <OwnerCard />
        <div className="mt-2">
          <Hitokoto />
        </div>
      </Col>
      <Col xs={12} lg={8}>
        <PaginationUrlContextProvider>
          <PostList />
        </PaginationUrlContextProvider>
      </Col>
    </Row>
  );
}
