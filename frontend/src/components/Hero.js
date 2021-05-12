import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Col, Row } from 'react-bootstrap';

const Hero = () => {
  return (
    <Jumbotron className="mt-2">
      <Row>
        <Col>
          <h1>Divulga já!!</h1>

          <p>
            Furtaram a tua bicicleta e tens o desejo que seja encontrada? -
            Visibilidade; - Possibilidade de procurar por NSerie; Regista já a
            tua bicicleta.
          </p>

          <Link className="btn btn-primary my-3" to="/register">
            Registar
          </Link>
        </Col>

        <Col>IMAGE</Col>
      </Row>
    </Jumbotron>
  );
};

export default Hero;