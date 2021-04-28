import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Bike from '../components/Bike';
import { listBikes } from '../actions/bikeActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listBike = useSelector((state) => state.listBike);
  const { bikes } = listBike;

  useEffect(() => {
    dispatch(listBikes());
  }, [dispatch]);

  return (
    <>
      <h1>Últimas Bicicletas Furtadas</h1>

      <Row>
        {bikes.map((bike) => (
          <Col key={bike._id} sm={12} md={6} lg={4} xl={3}>
            <Bike bike={bike} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
