import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />

      <Route path="/login" component={LoginScreen} />

      <Route path="/" component={HomeScreen} exact />

      <Footer />
    </Router>
  );
};

export default App;
