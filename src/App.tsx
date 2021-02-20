import React from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import {BrowserRouter, Link, NavLink, Route, Switch} from 'react-router-dom';

import Archive from './pages/Archive'
import Home from './pages/Home'
import Tags from './pages/Tags'
import {ShieldsIOGithubRepoStarsBadge} from "./components/ShieldsIO";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Link to="/" className="navbar-brand">Lancern</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <NavLink to="/archive" className="nav-link" activeClassName="active">Archive</NavLink>
                <NavLink to="/tags" className="nav-link" activeClassName="active">Tags</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="mt-2">
          <Container>
            <Switch>
              <Route path="/archive">
                <Archive />
              </Route>
              <Route path="/tags">
                <Tags />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </div>
        <footer className="small text-center p-4" style={{backgroundColor: '#eeeeee'}}>
          <Container>
            <Row>
              <Col>
                Sirui Mu © 2021 <br />
                Powered by Sirius blog engine <br/>
                <ShieldsIOGithubRepoStarsBadge user="Lancern" repo="sirius" style="social" />
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}
