import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserDetails,
  updateUserProfile,
  deleteUser,
} from '../actions/userActions';
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

  // change to list my bikes
  const listBike = useSelector((state) => state.listBike);
  const { bikes } = listBike;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        // dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match!');
    }
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  const deleteHandler = (id) => {
    if (window.confirm('Esta ação não poderá ser revertida, tem a certeza?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Row>
        <Col md={3} className="mt-2">
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>

        <Col md={9} className="mt-2">
          <h3>Minhas Bicicletas</h3>
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
                  <td>{bike.isRecovered}</td>
                  <td>
                    {/* Create new page for detailing own bikes */}
                    <LinkContainer to={`/bike/${bike._id}`}>
                      <Button className="btn-sm" variant="light">
                        Detalhes
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 3, offset: 10 }}>
          <Button
            type="delete"
            variant="danger"
            className="mt-3 mb-3 btn-sm"
            onClick={() => {
              deleteHandler(user._id);
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
