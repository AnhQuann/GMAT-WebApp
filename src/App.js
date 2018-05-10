import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/user/login';
import LecturerContainer from './components/lecturer/LecturerContainer';
import StudentContainer from './components/student/StudentContainer';
import Popup from './components/common/Popup';
import { checkToken } from './actions';

<<<<<<< HEAD
import { ROLE_LECTURER } from  './constants';
=======
import { ROUTER_LECTURER, ROUTER_STUDENT } from './constants';
>>>>>>> origin/student-features

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

  componentWillMount() {
    this.props.checkToken();
  }

  renderApp(role) {
    return (
      <div>
        <Popup />
<<<<<<< HEAD
        {
          role === ROLE_LECTURER ?
          <LecturerContainer /> :
          <div>Student</div>
        }
=======
        <Switch>
          <Route path={ROUTER_LECTURER} component={LecturerContainer}/>
          <Route path={ROUTER_STUDENT} component={StudentContainer}/>
        </Switch>
>>>>>>> origin/student-features
      </div>
    );
  }
}

function mapReducerToState({ authReducer }) {
  return { authReducer };
}

const actions = {
  checkToken
}

export default withRouter (
  connect(mapReducerToState, actions)(App)
);
