import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import { checkToken } from './actions';

import Login from './components/user/login';
import Main from './components/main';
import Loading from './components/common/loading';

import LecturerContainer from './components/lecturer/LecturerContainer';
import StudentContainer from './components/student/StudentContainer';
import Popup from './components/common/Popup';

import { ROUTER_LECTURER, ROUTER_STUDENT } from './constants';

class App extends Component {

  render() {
    return (
      <div>
        <Popup />
        <Switch>
          <Route path={ROUTER_LECTURER} component={LecturerContainer}/>
          <Route path={ROUTER_STUDENT} component={StudentContainer}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
