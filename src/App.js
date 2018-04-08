import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './components/user/login';
import Dummy from './components/dummy';

class App extends Component {
  render() {
    if(this.props.authReducer.isLoggedIn) {
      return  <Dummy />;
    } else {
      return <Login />;
    }
  }
}

function mapStateToProps({ authReducer }) {
  return { authReducer };
}

export default connect(mapStateToProps, {})(App);
