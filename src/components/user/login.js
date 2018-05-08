import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, Container, FormGroup, FormFeedback } from 'reactstrap';
import { flatten } from 'flat';

import { login } from '../../actions';

import EditPanel from '../common/EditPanel';

import Loading from '../common/loading';

class Login extends EditPanel {
  constructor(props) {
    super(props);
    
    this.state = {
      loggingIn: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({
      loggingIn: true
    });
    this.props.login(this.values.username, this.values.password);
  }

  render() {
    if (this.state.loggingIn) {
      return <Loading />;
    }
    else {
      return this.renderLoginForm();
    }
  }

  renderLoginForm() {
    return (
      <Container className="d-flex align-items-center justify-content-center h-100">
        <Col md="4">
          <FormGroup>
            <label>Username</label>
            <Input onBlur={this.blurToProp("values.username")} />
          </FormGroup>
          
          <FormGroup>
            <label>Password</label>
            <Input type="password" onBlur={this.blurToProp("values.password")}/>
          </FormGroup>

          <FormGroup className="d-flex">
            <Button className="ml-auto" color="primary" onClick={this.onSubmit}>Sign in</Button>
          </FormGroup>
        </Col>
      </Container>
    );
  }
}

const actions = {
  login
}

export default connect(null, actions)(Login);