import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { BrowserRouter, Switch } from 'react-router-dom';

import LecturerContainer from './components/lecturer/LecturerContainer';

import { checkToken } from './actions';

import Login from './components/user/login';
import Main from './components/main';
import Loading from './components/common/loading';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <LecturerContainer />
      </div>
    );
  }
}

export default App;
