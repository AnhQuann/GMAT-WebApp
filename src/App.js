import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { checkToken } from './actions';

import Login from './components/user/login';
import Main from './components/main';
import Loading from './components/common/loading';

import LecturerContainer from './components/lecturer/LecturerContainer';
import Popup from './components/common/Popup';


class App extends Component {

  render() {
    return (
      <div>
        <Popup />
        <LecturerContainer />
      </div>
    );
  }
}

export default App;
