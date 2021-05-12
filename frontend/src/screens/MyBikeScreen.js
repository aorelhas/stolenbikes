import axios from 'axios';
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
import Meta from '../components/Meta';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { listBikeDetails, bikeUpdate } from '../actions/bikeActions';

const MyBikeScreen = ({ history, match }) => {
  const bikeId = match.params.id;

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [nSerie, setnSerie] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isRecovered, setIsRecovered] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const bikeDetail = useSelector((state) => state.bikeDetail);
  const { loading, error, bike } = bikeDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!bike.brand || bike._id !== bikeId) {
        dispatch(listBikeDetails(bikeId));
      } else {
        setBrand(bike.brand);
        setModel(bike.model);
        setnSerie(bike.nSerie);
        setYear(bike.year);
        setLocation(bike.location);
        setDescription(bike.description);
        setPostalCode(bike.postalCode);
        setIsRecovered(bike.isRecovered);
      }
    }
  }, [dispatch, history, bike, bikeId]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      bikeUpdate({
        _id: bikeId,
        brand,
        model,
        nSerie,
        year,
        image,
        location,
        postalCode,
        description,
        isRecovered,
      })
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
    <>
      <Link className="btn btn-light my-3" to="/profile">
        {' '}
        Voltar
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={bike.brand} description={bike.model} />
          <FormContainer>
            <h2>Editar Bicicleta</h2>
          </FormContainer>

          <Row>
            <Col md={8}>
              {bike.image ? (
                <Image src={bike.image} alt={bike.model} fluid />

              ) : (
                <span>Not Found</span>
              )}
            </Col>
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
                <Form.Label>ImageM</Form.Label>
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

              <Form.Group controlId="isRecovered">
                <Form.Check
                  type="checkbox"
                  label="Recuperada?"
                  checked={isRecovered}
                  onChange={(e) => setIsRecovered(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </Form>
          </Row>
        </>
      )}
    </>
  );
};

export default MyBikeScreen;
