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
import Loader from '../components/Loader';
import { listBikeDetails, createBikeComment } from '../actions/bikeActions';
import { BIKE_CREATE_COMMENT_RESET } from '../constants/bikeContants';

const styles = {
  cardImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
};

const BikeScreen = ({ match }) => {
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const bikeDetail = useSelector((state) => state.bikeDetail);
  const { loading, error, bike } = bikeDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bikeCommentCreate = useSelector((state) => state.bikeCommentCreate);
  const {
    success: successBikeComment,
    error: errorBikeComment,
  } = bikeCommentCreate;

  useEffect(() => {
    if (successBikeComment) {
      alert('Comentário Adicionado');
      setComment('');
      dispatch({ type: BIKE_CREATE_COMMENT_RESET });
    }

    dispatch(listBikeDetails(match.params.id));
  }, [dispatch, match, successBikeComment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBikeComment(match.params.id, {
        comment,
      })
    );
  };

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
              <Image
                src={bike.image}
                alt={bike.model}
                style={styles.cardImage}
              />
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{bike.brand}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Modelo:</strong> {bike.model}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Ano:</strong> {bike.year}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Localização:</strong> {bike.location}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Cód. Postal:</strong> {bike.postalCode}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Descrição:</strong> {bike.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <h2>Comentários</h2>
              {/* {bike.posts.length === 0 && <Message>Sem Comentários</Message>} */}
              <Card>
                <ListGroup variant="flush">
                  {bike.posts.map((post) => (
                    <ListGroup.Item key={post._id}>
                      <strong>{post.name}</strong>
                      <p>{post.createdAt.substring(0, 10)}</p>
                      <p>{post.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
              {errorBikeComment && (
                <Message variant="danger">{errorBikeComment}</Message>
              )}
              {userInfo ? (
                <Card className='mt-2'>
                  <ListGroup.Item>
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="comment">
                        <Form.Label>Comentário</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary"
                        className="mt-2 mb-2"
                      >
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
