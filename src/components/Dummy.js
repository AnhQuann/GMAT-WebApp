import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseDummyNumber } from '../actions';

class Dummy extends Component {
    constructor(props) {
        super(props);
        this.onIncreaseClick = this.onIncreaseClick.bind(this);
    }

    onIncreaseClick() {
        this.props.increaseDummyNumber();
    }

    render() {
        return (
            <div>
                {this.props.dummyReducer.n} <button onClick={this.onIncreaseClick}>+</button>
            </div>
        );
    }
};

function mapStateToProps({ dummyReducer }) {
    return { dummyReducer };
};

export default connect(mapStateToProps, { increaseDummyNumber })(Dummy);