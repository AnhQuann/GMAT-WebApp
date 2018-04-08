import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Input, Progress } from 'reactstrap';

import { login } from '../../actions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {...this.state, user: {}};
        
        this.onClickLogin = this.onClickLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClickLogin() {
        this.props.login(this.state.user.username, this.state.user.password);
    }

    handleChange(e) {
        var user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState(this.state, () => { return {...this.state, user} })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md='12'>
                        <h1>Login</h1>
                        <div>
                            <Input type="email" name="username" placeholder="Username" onChange={this.handleChange}></Input>
                        </div>
                        <div>
                            <Input type="password" name="password" placeholder="Password" onChange={this.handleChange}></Input>
                        </div>
                        <Button color='primary' onClick={this.onClickLogin}>Login</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps({ authReducer }) {
    return { authReducer };
}

export default connect(mapStateToProps, { login })(Login);