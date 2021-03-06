import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  //   getUserDetails,
  updateUserProfile,
  deleteUser,
  logout,
} from '../actions/userActions';
import { getMyOwnBikes, deleteBike } from '../actions/bikeActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const UserAccount = ({ history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const getMyBikes = useSelector((state) => state.getMyBikes);
  const { loading: loadingBikes, error: errorBikes, bikes } = getMyBikes;

  //   TODO -> Change to user Details (user)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!userInfo.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        // dispatch(getUserDetails('profile'));
      } else {
        dispatch(getMyOwnBikes());
        setName(userInfo.name);
        setUsername(userInfo.username);
        setEmail(userInfo.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match!');
    }
    dispatch(
      updateUserProfile({ id: userInfo._id, name, email, username, password })
    );
  };

  const deleteHandler = (id) => {
    if (window.confirm('Esta a????o n??o poder?? ser revertida, tem a certeza?')) {
      dispatch(deleteUser(id));
      dispatch(logout());
      setMessage('Conta removida.');
      history.push('/');
    }
  };

  const deleteBikeHandler = (id) => {
    if (window.confirm('Deseja remover a bicicleta?')) {
      dispatch(deleteBike(id));
      setMessage('Bicicleta removida.');
      history.push('/');
    }
  };

  return (
    <>
      <Row>
        <Col md={3} className="mt-2">
          {/* <Card> */}
          <h3>Dados Pessoais</h3>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Change Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="name"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className='mt-2'>
              Atualizar
            </Button>
          </Form>
          {/* </Card> */}
        </Col>

        <Col md={9} className="mt-2">
          <h3>Minhas Bicicletas</h3>
          {loadingBikes ? (
            <Loader />
          ) : errorBikes ? (
            <Message variant="danger">{errorBikes}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ano</th>
                  <th>Encontrada</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr key={bike._id}>
                    <td>{bike.brand}</td>
                    <td>{bike.model}</td>
                    <td>{bike.year}</td>
                    <td>
                      {bike.isRecovered ? (
                        <span style={{ color: 'green' }}>Yes</span>
                      ) : (
                        <span style={{ color: 'red' }}>X</span>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/mybike/${bike._id}`}>
                        <Button className="btn-sm" variant="light">
                          Detalhes
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => {
                          deleteBikeHandler(bike._id);
                        }}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 3, offset: 10 }}>
          <Button
            type="delete"
            variant="danger"
            className="mt-3 mb-3 btn-sm"
            onClick={() => {
              deleteHandler(userInfo._id);
            }}
          >
            <i className="fas fa-trash"></i>
            Delete Account
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserAccount;
