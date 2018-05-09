import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import Loading from '../common/Loading';
import { fetchResult } from '../../actions';

import { ROUTER_STUDENT } from '../../constants';

class ResultPanel extends Component {
    constructor(props) {
        super(props);

        this.renderResultTable = this.renderResultTable.bind(this);
        this.renderDifficulty = this.renderDifficulty.bind(this);
    }

    componentWillMount() {
        this.props.fetchResult(this.props.match.params.id);
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

    renderResultTable(result) {
        if(result) {
            let numberRightAnswers = result.answers.filter(e => e.isCorrect).length;
            let correctPercent = result.answers > 0 ? parseFloat(((parseInt(numberRightAnswers)/parseInt(result.answers.length))*100).toFixed(2)) : 0;

            return (
                <Col sm="12">
                    <br />
                    <h3>You answered { numberRightAnswers } out of { result.answers.length } ({ correctPercent }%) correctly.</h3>
                    <h3>Total time: { moment().startOf('day').seconds(result.totalTime).format('H:mm:ss') }</h3>

                    <Table responsive bordered>
                        <thead>
                            <tr>
                                <th className="text-center">Order</th>
                                <th className="text-center">Difficulty</th>
                                <th className="text-center">Response</th>
                                <th className="text-center">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result.answers.map((answer, index) => {
                                    let time = moment().startOf('day').seconds(answer.time ? answer.time : 0);
                                    return (
                                        <tr key={index}>
                                            <th scope="row" className="text-center">{index+1}</th>
                                            <td className="text-center">{ this.renderDifficulty(answer.question.difficulty) }</td>
                                            <td className="text-center">{ answer.choice != null ? (answer.isCorrect ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>) : '' }</td>
                                            <td className="text-center">{`
                                                ${ answer.time >= 3600 ? `${ time.format('H') } hours ` : '' }
                                                ${ answer.time >= 60 ? `${ time.format('mm') } minutes ` : '' }
                                                ${ answer.time == 0 || answer.time == null ? 0 : `${ time.format('ss') }` } seconds
                                            `}</td>
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
        if(this.props.resultReducer.result) {
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
                        { this.renderResultTable(this.props.resultReducer.result) }
                    </Row>
                </Container>
            );
        } else {
            return <Loading />;
        }
    }
}

function mapReducerToProps({ resultReducer }) {
    return { resultReducer };
}

const actions = {
    fetchResult
}

export default connect(mapReducerToProps, actions)(ResultPanel);