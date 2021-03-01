import {Col, ListGroup, Row} from 'react-bootstrap';
import {BsBoxArrowLeft, BsLock, BsPencil, BsPlus} from 'react-icons/all';
import {useHistory} from 'react-router-dom';

import Icon from '../../components/Icon';
import {useAuth} from '../../context/auth';

export default function AdminHomePage(): JSX.Element {
  const auth = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <Row>
      <Col xs={12} lg={4} xl={3}>
        <ListGroup>
          <ListGroup.Item action variant="primary" onClick={() => history.push('/admin/new')}>
            <Icon><BsPlus /></Icon>
            Write New Post
          </ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => history.push('/admin/owner')}>
            <Icon><BsPencil /></Icon>
            Edit Owner's Info
          </ListGroup.Item>
          <ListGroup.Item action variant="light" onClick={() => history.push("/admin/password")}>
            <Icon><BsLock /></Icon>
            Change Admin Password
          </ListGroup.Item>
          <ListGroup.Item action variant="warning" onClick={handleSignOut}>
            <Icon><BsBoxArrowLeft /></Icon>
            Sign Out
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col xs={12} lg={8} xl={9}>
        Here is blog post list
      </Col>
    </Row>
  );
}