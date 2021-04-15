import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Stolen Bikes</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/bicicletas">
              <Nav.Link>Bicicletas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default header;
