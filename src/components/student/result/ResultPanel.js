import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import _ from 'lodash';

import Loading from '../../common/Loading';
import Time from '../../common/Time';

import { fetchResult } from 'networks';
import { ROUTER_STUDENT, ROUTER_REVIEW } from 'statics';

class ResultPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderResultTable = this.renderResultTable.bind(this);
        this.renderQuestionType = this.renderQuestionType.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if(id) {
          fetchResult(id).then((result) => {
            this.setState({
              result
            });
          });
        }
    }

    renderQuestionType(questionType) {
      switch(questionType) {
        case "CR":
          return "Critical Reasoning";
        default:
          return questionType;
      }
    }

    resultTableData() {
      const result = this.state.result;
      const answers = result.answers;
      
      return _.flatten(
        answers.map((answer, answerIndex) => {
          return answer.userChoices.map((userChoice, choiceIndex) => {
            const question = answer.question;
            const detail = question.details[choiceIndex];
            const type = question.type;
            const typeString = `Verbal - V${type}${answer.question._id} - 0${choiceIndex + 1}`;
            return {
              type: typeString,
              time: userChoice.time,
              guess: userChoice.guess,
              isRight: userChoice.choice === detail.rightChoice
            }
          });
        })
      );
    }

    renderResultTable() {
        const results = this.resultTableData();
        const correctAnswerCount = results.filter(result => result.isRight).length;
        const correctPercentage = results.length ? parseFloat((correctAnswerCount/results.length).toFixed(3)) : 0;
        return (
            <Col sm="12">
                <br />
                <h3>You answered { correctAnswerCount } out of {results.length} ({correctPercentage}%) correctly.</h3>

                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th className="text-center">Order</th>
                            <th className="text-center">Question Type</th>
                            <th className="text-center">Response</th>
                            <th className="text-center">Guess</th>
                            <th className="text-center">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">{ index + 1 }</th>
                                        <td className="text-center">{ result.type }</td>
                                        <td className="text-center">{ result.isRight ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i> }</td>
                                        <td className="text-center">{ !!result.guess ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i> }</td>
                                        <td className="text-center">
                                          <Time value={result.time} />
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Col>
        );
    }
    
    render() {
      const result = this.state.result;
      if(!result) return (<Loading />);
      return (
          <Container className="result">
              <Row>
                  <Col sm="6">
                      <h2>Review your responses</h2>
                  </Col>
                  
                  <Col sm="6" className="text-right">
                      <Button color="info" className="mr-2" onClick={() => { this.props.history.push(`${ROUTER_REVIEW}/${this.props.match.params.id}`); }}>Review</Button>
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

export default ResultPanel;