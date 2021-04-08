import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/homeScreen';

const App = () => {
  return (
    <Router>
      <Header />

      <Route path="/" component={HomeScreen} exact />

      <Footer />
    </Router>
  );
};

export default App;
