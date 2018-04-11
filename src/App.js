import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { isAuth } from './actions';

import Login from './components/user/login';
import Dummy from './components/dummy';
import Loading from './components/common/loading';

class App extends Component {
  constructor(props) {
    super(props);

    this.removeToken = this.removeToken.bind(this);
    this.renderChild = this.renderChild.bind(this);
  }

  componentWillMount() {
    this.props.isAuth();
  }

  removeToken() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  renderChild() {
    if (this.props.authReducer.isAuth) {
      if(this.props.authReducer.isLoggedIn) {
        return  <Dummy />;
      } else {
        return (
          <div>
            {this.removeToken()}
            <Login />
          </div>
        );
      }
    } else {
      return <Loading />;
    }
  }

  render() {
    return (
      <Container>{this.renderChild()}</Container>
    );
  }
}

function mapStateToProps({ authReducer }) {
  return { authReducer };
}

export default connect(mapStateToProps, { isAuth })(App);
