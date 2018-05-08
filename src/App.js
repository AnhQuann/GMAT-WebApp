import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/user/login';
import LecturerContainer from './components/lecturer/LecturerContainer';
import Popup from './components/common/Popup';

import { ROLE_LECTURER, ROLE_STUDENT } from  './constants';

class App extends Component {

  render() {
    const authReducer = this.props.authReducer;
    if (authReducer.isLoggedIn) {
      return this.renderApp(authReducer.role);
    }
    else {
      return (<Login />);
    }
  }

  renderApp(role) {
    return (
      <div>
        <Popup />
        {
          role === ROLE_LECTURER ?
          <LecturerContainer /> :
          <div>Student</div>
        }
      </div>
    );
  }
}

function mapReducerToState({ authReducer }) {
  console.log(authReducer);
  return { authReducer };
}

export default withRouter (
  connect(mapReducerToState)(App)
);
