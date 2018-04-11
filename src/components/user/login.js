import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, FormGroup, FormFeedback } from 'reactstrap';
import { flatten } from 'flat';

import { login } from '../../actions';

import Loading from '../common/loading';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {...this.state, user: { username: '', password: '' }, onSubmitLogin: false};
        
        this.onClickLogin = this.onClickLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.handleChange('onSubmitLogin', false);
    }

    onClickLogin() {
        this.handleChange('onSubmitLogin', true);
        this.props.login(this.state.user.username, this.state.user.password);
    }

    handleChange(field, value) {
        let flattenState = flatten(this.state);
        flattenState[field] = value;
        this.setState(flatten.unflatten(flattenState));
    }

    render() {
        if (!this.state.onSubmitLogin) {
            return (
                <Row className="login">
                    <Col md='6'>
                        <h1 className="text-center">Welcome!</h1>
                        <FormGroup>
                            <Input {...(this.props.authReducer.errMessage ? {invalid:true} : {})} value={this.state.user.username} type="email" name="username" placeholder="Username" onChange={(e) => this.handleChange('user.username', e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Input {...(this.props.authReducer.errMessage ? {invalid:true} : {})} value={this.state.user.password} type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange('user.password', e.target.value)}></Input>
                            <FormFeedback>{this.props.authReducer.errMessage}</FormFeedback>
                        </FormGroup>
                        <Button className="float-right" color='primary' onClick={this.onClickLogin}>Login</Button>
                    </Col>
                </Row>
            );
        } else {
            return <Loading />;
        }
    }
}

function mapStateToProps({ authReducer }) {
    return { authReducer };
}

export default connect(mapStateToProps, { login })(Login);