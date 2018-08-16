import React from 'react';
import { connect } from 'react-redux';
import { Col, Button, Form, Input, Container, FormGroup, FormFeedback } from 'reactstrap';

import { login } from 'actions';

import EditPanel from '../common/EditPanel';

import Loading from '../common/Loading';

import './login.css';

class Login extends EditPanel {
  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false
    };

    this.values = {
      username: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loggingIn: true
    });
    this.props.login(this.values.username, this.values.password);
  }

  render() {
    const auth = this.props.authReducer;
    if (!auth.errMessage && this.state.loggingIn) {
      return <Loading />;
    }
    else {
      return this.renderLoginForm();
    }
  }

  renderLoginForm() {
    const auth = this.props.authReducer;
    return (
      <div className="bg-color vh-100">
        <Container className=" d-flex align-items-center justify-content-center h-100">
          <Col md="4">
            <h2 className="login-header text-white"> iliat-gmat </h2>
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="m-0px">
                <Input
                  className="input-top"
                  onChange={this.inputToProp("values.username")}
                  placeholder="Username"
                  invalid={auth.errMessage !== null}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  className="input-bot"
                  type="password"
                  onChange={this.inputToProp("values.password")}
                  placeholder="Password"
                  invalid={auth.errMessage !== null}
                />
              </FormGroup>

              <Input type="hidden" invalid={auth.errMessage !== null} />
              <FormFeedback>{auth.errMessage}</FormFeedback>

              <FormGroup className="d-flex">
                <Button className="ml-auto button text-dark login-btn" >Sign in</Button>
              </FormGroup>
            </Form>
          </Col>
        </Container>
      </div>
    );
  }
}

function mapReducerToState({ authReducer }) {
  return { authReducer };
}

const actions = {
  login
}

export default connect(mapReducerToState, actions)(Login);
