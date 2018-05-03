import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { checkToken } from './actions';

import LecturerContainer from './components/lecturer/LecturerContainer'

class App extends Component {

  render() {
    return (
      <LecturerContainer />
    );
  }
}

export default App;
