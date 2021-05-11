import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Bike from '../components/Bike';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Hero from '../components/Hero'
import Services from '../components/Services'
import { listBikes } from '../actions/bikeActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const listBike = useSelector((state) => state.listBike);
  const { loading, error, bikes } = listBike;

  useEffect(() => {
    dispatch(listBikes());
  }, [dispatch]);

  return (
    <>
      <Hero />
      <h1>Últimas Bicicletas Furtadas</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {bikes.map((bike) => (
              <Col key={bike._id} sm={12} md={6} lg={4} xl={3}>
                <Bike bike={bike} />
              </Col>
            ))}
          </Row>
        </>
      )}

      <Services />
    </>
  );
};

export default HomeScreen;
