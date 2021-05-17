import React, { useEffect } from 'react';
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
import Loader from '../components/Loader';
import { listBikeDetails } from '../actions/bikeActions';

const BikeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bikeDetail = useSelector((state) => state.bikeDetail);
  const { loading, error, bike } = bikeDetail;

  useEffect(() => {
    dispatch(listBikeDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
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
          <Row>
            <Col md={8}>
              <Image src={bike.image} alt={bike.model} fluid />
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{bike.brand}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Model:</strong> {bike.model}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Ano:</strong> {bike.year}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Localização:</strong> {bike.location}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Descrição:</strong> {bike.description}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Cód. Postal:</strong> {bike.postalCode}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Comentários</h2>
              {userInfo ? (
                <Card>
                  <ListGroup.Item>
                    <Form>
                      <Form.Group controlId="comment">
                        <Form.Label>Comentário</Form.Label>
                        <Form.Control as="textarea" row="3"></Form.Control>
                      </Form.Group>

                      <Button type="submit" variant="primary">
                        Publicar Comentário
                      </Button>
                    </Form>
                  </ListGroup.Item>
                </Card>
              ) : (
                <Message>
                  É necessário <Link to="/login"> Entrar</Link> para poder
                  comentar
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default BikeScreen;
