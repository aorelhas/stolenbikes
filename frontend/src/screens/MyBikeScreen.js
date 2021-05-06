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
import { listBikeDetails } from '../actions/bikeActions';

const MyBikeScreen = ({ match }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [nSerie, setnSerie] = useState('');
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isRecovered, setIsRecovered] = useState(false);

  const dispatch = useDispatch();

  const bikeDetail = useSelector((state) => state.bikeDetail);
  const { loading, error, bike } = bikeDetail;

  useEffect(() => {
    dispatch(listBikeDetails(match.params.id));
  }, [dispatch, match]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(isRecovered);
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
              <h3>IMAGE</h3>
              {/* <Image src={bike.image} alt={bike.model} fluid /> */}
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
                Registar Bicicleta
              </Button>
            </Form>
          </Row>
        </>
      )}
    </>
  );
};

export default MyBikeScreen;
