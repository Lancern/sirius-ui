import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
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
        <div style={{padding: '0.8rem 0'}}>
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
        </div>
        <footer style={{
          padding: '2rem 0',
          backgroundColor: '#eeeeee',
          textAlign: 'center',
          fontSize: '.8em',
        }}>
          <Container>
            Sirui Mu © 2021 <br />
            Powered by Sirius blog engine <br/>
            <ShieldsIOGithubRepoStarsBadge user="Lancern" repo="sirius" style="social" />
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}
