import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Stolen Bikes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>Bicicletas</Nav.Link>
            <Nav.Link>Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default header;
