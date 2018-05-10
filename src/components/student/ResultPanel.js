import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import { ROUTER_STUDENT } from '../../constants';

class ResultPanel extends Component {
    constructor(props) {
        super(props);

        this.renderResultTable = this.renderResultTable.bind(this);
        this.renderDifficulty = this.renderDifficulty.bind(this);
    }

    renderDifficulty(difficulty) {
        switch(difficulty) {
          case 0: return (<span>Easy</span>);
          case 1: return (<span>Medium</span>);
          case 2: return (<span>Hard</span>);
          case 3: return (<span>Very hard</span>);
          default: return (<span>Unknown</span>);
        }
    }

    renderResultTable() {
        if(this.props.resultReducer.result) {
            let result = this.props.resultReducer.result;
            let numberRightAnswers = _.filter(result, e => e.response);
            let correctPercent = _.values(result).length > 0 ? parseFloat(((parseInt(numberRightAnswers.length)/parseInt(_.values(result).length))*100).toFixed(2)) : 0;

            return (
                <Col sm="12">
                    <br />
                    <h3>You answered {numberRightAnswers.length} out of {_.values(result).length} ({correctPercent}%) correctly.</h3>
                    <h3>Total time: {moment().startOf('day').seconds(this.props.resultReducer.totalTime).format('H:mm:ss')}</h3>

                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th className="text-center">Order</th>
                                <th className="text-center">Difficulty</th>
                                <th className="text-center">Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.values(result).map((result, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row" className="text-center">{index+1}</th>
                                            <td className="text-center">{this.renderDifficulty(result.difficulty)}</td>
                                            <td className="text-center">{result.response != null ? (result.response ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>) : ''}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            );
        } else {
            return <Col sm="12">"Nothing to show!"</Col>;
        }
    }
    
    render() {
        return (
            <Container className="result">
                <Row>
                    <Col sm="6">
                        <h2>Review your responses</h2>
                    </Col>
                    <Col sm="6" className="text-right">
                        <Button color="info" onClick={() => { this.props.history.push(ROUTER_STUDENT); }}>Back to Homepage</Button>
                    </Col>
                </Row>
                <Row>
                    {this.renderResultTable()}
                </Row>
            </Container>
        );
    }
}

function mapReducerToProps({ resultReducer }) {
    return { resultReducer };
}

export default connect(mapReducerToProps, {})(ResultPanel);