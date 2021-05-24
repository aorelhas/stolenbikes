import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          &copy; Copyright <strong> Stolen Bikes </strong>. All Rights Reserved
          <Col>
            <Nav className="justify-content-end">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/privacy">
                <Nav.Link>Privacy</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/terms">
                <Nav.Link>Terms</Nav.Link>
              </LinkContainer>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
