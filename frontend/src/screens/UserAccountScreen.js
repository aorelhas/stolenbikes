import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBikes } from '../actions/bikeActions';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const UserAccount = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const listBike = useSelector((state) => state.listBike);
  const { bikes } = listBike;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      } else {
        setEmail(user.email);
        setName(user.name);
        setUsername(user.username);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      //   setMessage('Password do not match!');
      console.log('PW Do not match');
    }
    dispatch(updateUserProfile({ id: user._id, name, email, password }));
  };

  return (
    <>
      <Row>
        <Col md={3} className="mt-2">
          <h3>Dados Pessoais</h3>
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
          <Button type="delete" variant="danger" className="mt-3 mb-3">
            Delete Account
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserAccount;
