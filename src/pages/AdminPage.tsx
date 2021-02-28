import {Col, Row} from 'react-bootstrap';

import {AuthRedirect} from '../context/auth';

export default function AdminPage(): JSX.Element {
  return (
    <Row>
      <Col>
        <AuthRedirect>
          This is admin page
        </AuthRedirect>
      </Col>
    </Row>
  );
}
