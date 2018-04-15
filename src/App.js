import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';

import { checkToken } from './actions';

import Login from './components/user/login';
import Main from './components/main';
import Dummy from './components/dummy';
import Loading from './components/common/loading';

class App extends Component {
  componentWillMount() {
    this.props.checkToken();
  }

  render() {
    return (
      <Container>{
        this.props.authReducer.doneCheckToken
          ? (this.props.authReducer.isLoggedIn
            ? (<main>
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/dummy" component={Dummy} />
              </Switch>
            </main>)
            : <Login />)
          : <Loading />
      }</Container>
    );
  }
}

function mapStateToProps({ authReducer }) {
  return { authReducer };
}

export default connect(mapStateToProps, { checkToken })(App);
