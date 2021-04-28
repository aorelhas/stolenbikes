import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Bike = ({ bike }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/bike/${bike._id}`}>
        <Card.Img src={bike.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/bike/${bike._id}`}>
          <Card.Title as="div">
            <strong>{bike.brand}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h3">{bike.model}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Bike;
