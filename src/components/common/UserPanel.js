import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { logout, fetchUserInfo } from '../../actions';

class UserPanel extends Component {
    componentWillMount() {
        this.props.fetchUserInfo();
    }

    render() {
        return (
            <Row className="user_panel">
                <Col sm="12" className="text-right">
                    <h3>Hi, {this.props.authReducer.user ? this.props.authReducer.user.username : ''}.</h3>
                    <Button color="danger">Logout</Button>
                </Col>
            </Row>
        );
    }
}

function mapReducerToState({ authReducer }) {
    return { authReducer };
}

const actions = {
    logout,
    fetchUserInfo
};
 
export default connect(mapReducerToState, actions)(UserPanel);