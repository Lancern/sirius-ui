import {Card, Col, Row} from "react-bootstrap";

import SignInForm from 'components/SignInForm';

export default function SignInPage(): JSX.Element {
  return (
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Card className="mt-4 mb-4" body>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h3>Sign In</h3>
          </div>
          <Card className="mt-2" body>
            <SignInForm />
          </Card>
        </Card>
      </Col>
    </Row>
  );
}
