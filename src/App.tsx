import {Container, Nav, Navbar} from 'react-bootstrap';

import Home from './pages/Home'

function App(): JSX.Element {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Lancern's Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link>Archive</Nav.Link>
              <Nav.Link>Tags</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{padding: '0.8rem 0'}}>
        <Home />
      </div>
      <footer style={{
        padding: '2rem 0',
        backgroundColor: '#eeeeee',
        textAlign: 'center',
        fontSize: '.8em',
      }}>
        <Container>
          Sirui Mu © 2021 <br />
          Powered by Sirius blog engine
        </Container>
      </footer>
    </div>
  );
}

export default App;
