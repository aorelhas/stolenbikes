import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateBikeScreen from './screens/CreateBikeScreen';
import BikeScreen from './screens/BikeScreen';
import UserAccountScreen from './screens/UserAccountScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/addbike" component={CreateBikeScreen} />
        <Route path="/myaccount" component={UserAccountScreen} />
        <Route path="/bike/:id" component={BikeScreen} />

        <Route path="/" component={HomeScreen} exact />
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
