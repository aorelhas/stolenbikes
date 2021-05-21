import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const styles = {
  cardImage: {
    objectFit: 'cover',
    width: '100%',
    height: '25vh',
  },
};

const Bike = ({ bike }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Link to={`/bike/${bike._id}`}>
        <Card.Img src={bike.image} variant="top" style={styles.cardImage} />
      </Link>

      <Card.Body>
        <Link to={`/bike/${bike._id}`}>
          <Card.Title as="div">
            <strong>{bike.brand}</strong>
          </Card.Title>
        </Link>

        <Card.Text>{bike.model}</Card.Text>
      </Card.Body>

      <LinkContainer to={`/bike/${bike._id}`}>
        <Button className="btn-sm" variant="primary">
          Detalhes
        </Button>
      </LinkContainer>
      {/* <Card.Footer>
        <small className="text-muted">Adicionada a: {bike.createdAt}</small>
      </Card.Footer> */}
    </Card>
  );
};

export default Bike;
