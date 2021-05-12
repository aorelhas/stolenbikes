import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { createBike } from '../actions/bikeActions';
import { CREATE_NEW_BIKE_RESET } from '../constants/bikeContants';

const CreateBike = ({ history }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [nSerie, setnSerie] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const createNewBike = useSelector((state) => state.createNewBike);
  const { success, error, loading } = createNewBike;

  useEffect(() => {
    if (success) {
      history.push('/');
      dispatch({ type: CREATE_NEW_BIKE_RESET });
    }
  }, [dispatch, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBike(
        brand,
        model,
        nSerie,
        year,
        image,
        location,
        description,
        postalCode
      )
    );
  };

  const uploadFileHandler = async (e) => {
    //if multiple images, remove the index from files
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <FormContainer>
      <h1>Add Bike</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
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

        <Form.Group controlId="image">
          <Form.Label>Imagem</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.File
            id="image-file"
            label="Choose File"
            custom
            onChange={uploadFileHandler}
          ></Form.File>
          {uploading && <Loader />}
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

        <Form.Group controlId="description">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
