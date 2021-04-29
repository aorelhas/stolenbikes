import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { createBike } from '../actions/bikeActions';
import { CREATE_NEW_BIKE_RESET } from '../constants/bikeContants';

const CreateBike = ({ history }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [nSerie, setnSerie] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const dispatch = useDispatch();

  const createNewBike = useSelector((state) => state.createNewBike);
  const { bike, success, error } = createNewBike;

  useEffect(() => {
    if (success) {
      history.push('/');
      dispatch({ type: CREATE_NEW_BIKE_RESET });
    }
  }, [history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBike(brand, model, nSerie, year, location, postalCode));
  };

  return (
    <FormContainer>
      <h1>Add Bike</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="brand">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Marca"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="model">
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Modelo"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="nSerie">
          <Form.Label>Número Série</Form.Label>
          <Form.Control
            type="text"
            placeholder="Número Série"
            value={nSerie}
            onChange={(e) => setnSerie(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label>Ano</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ano"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Localização</Form.Label>
          <Form.Control
            type="text"
            placeholder="Localização"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="number"
            placeholder="Código Postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Registar Bicicleta
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateBike;
