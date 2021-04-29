import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { listBikeDetails } from '../actions/bikeActions';

const BikeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const bikeDetail = useSelector((state) => state.bikeDetail);
  const { bike } = bikeDetail;

  useEffect(() => {
    dispatch(listBikeDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={bike.image} alt={bike.model} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{bike.model}</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default BikeScreen;
