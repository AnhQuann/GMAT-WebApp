import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, TabContent, TabPane } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import { checkAnswers } from '../../actions';

import { ROUTER_RESULT } from '../../constants';

class QuestionPackByIdPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            isPause: false,
            totalTime: 0,
            answers: _.mapKeys([], "questionId"),
            currentQuestionIndex: 0,
            questionPackId: !_.isNil(this.props.match.params.id) && !_.isNaN(Number(this.props.match.params.id)) ? this.props.match.params.id : null,
            questionPack: !_.isNil(this.props.match.params.id) && !_.isNaN(Number(this.props.match.params.id)) ? this.props.questionPackReducer[this.props.match.params.id] : null
        }

        this.renderTabsQuestion = this.renderTabsQuestion.bind(this);
        this.renderChoices = this.renderChoices.bind(this);
        this.handleSelectChoice = this.handleSelectChoice.bind(this);
        this.backToPpreviousQuestion = this.backToPpreviousQuestion.bind(this);
        this.goToNextQuestion = this.goToNextQuestion.bind(this);
        this.submitChoice = this.submitChoice.bind(this);
        this.clearChoice = this.clearChoice.bind(this);
        this.submitTest = this.submitTest.bind(this);
        this.handlePause = this.handlePause.bind(this);
    }

    componentDidMount() {
        if(this.state.questionPack && _.values(this.state.answers).length === 0) {
            this.setState({
                ...this.state,
                answers: _.mapKeys([{ questionId: this.state.questionPack.questions[0], choice: null }], "questionId")
            });
        }

        this.timer = setInterval(()=>{
            if(!this.state.isPause) {
                this.setState({
                    ...this.state,
                    totalTime: this.state.totalTime + 1
                });
            }
        }, 1000);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.resultReducer.result) {
            this.props.history.push(ROUTER_RESULT);
        }
    }

    submitTest() {
        clearInterval(this.timer);
        this.props.checkAnswers(this.state.answers, this.state.totalTime);
    }

    submitChoice(e) {
        e.preventDefault();
        if(this.state.questionPack && this.state.currentQuestionIndex + 1 >= this.state.questionPack.questions.length) {
            this.submitTest();
        } else {
            this.goToNextQuestion();
        }
    }

    clearChoice(questionId) {
        let answers = this.state.answers;

        if(answers[questionId]) {
            answers[questionId].choice = null;

            this.setState({
                ...this.state,
                answers: answers
            });
        }
    }

    handleSelectChoice(questionId, choice) {
        let answers = this.state.answers;

        if(answers[questionId]) {
            answers[questionId].choice = choice;

            this.setState({
                ...this.state,
                answers: answers
            });
        }
    }

    renderChoices(questionId, choices) {
        return choices.map((choice, index) => {
            return (
                <FormGroup key={index} check>
                    <Label check>
                    <Input checked={ Object.keys(this.state.answers).indexOf(`${this.state.questionPack.questions[this.state.currentQuestionIndex]}`) > -1 && this.state.answers[this.state.questionPack.questions[this.state.currentQuestionIndex]].choice == index ? true : false } type="radio" name={questionId} value={index} onChange={(e) => { return this.handleSelectChoice(e.target.name, e.target.value) }}/>{' '}
                        {choice}
                    </Label>
                </FormGroup>
            );
        });
    }

    renderTabsQuestion() {
        let questionPack = this.props.questionPackReducer[this.state.questionPackId];
        if(questionPack.questions.length > 0) {
            return questionPack.questions.map((questionId, index) => {
                let question = this.props.questionReducer[questionId];
                return (
                    <TabPane tabId={`${index}`} key={index}>
                        <Row>
                            <Col sm="12">
                                <Form onSubmit={this.submitChoice}>
                                    <p>{question.stimulus}</p>
                                    <p>{question.stem}</p>
                                    <FormGroup check row>
                                        {this.renderChoices(question.id, question.choices)}
                                    </FormGroup>
                                    <FormGroup check row className="form_menu">
                                        <Button disabled={this.state.answers[this.state.questionPack.questions[this.state.currentQuestionIndex]] && this.state.answers[this.state.questionPack.questions[this.state.currentQuestionIndex]].choice ? false : true} className="btn-success">Submit</Button>
                                        <div>
                                            <Button onClick={() => { this.clearChoice(this.state.questionPack.questions[this.state.currentQuestionIndex]) }}>Clear answer</Button>
                                            <Button disabled={this.state.answers[this.state.questionPack.questions[this.state.currentQuestionIndex]] && this.state.answers[this.state.questionPack.questions[this.state.currentQuestionIndex]].choice ? false : true}>Show answer</Button>
                                        </div>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                );
            });
        } else return <div>Question is empty!</div>;
    }

    backToPpreviousQuestion() {
        if(this.state.questionPack && this.state.currentQuestionIndex > 0) {
            this.setState({
                ...this.state,
                currentQuestionIndex: this.state.currentQuestionIndex - 1
            });
        }
    }

    goToNextQuestion() {
        if(this.state.questionPack && this.state.currentQuestionIndex + 1 < this.state.questionPack.questions.length) {
            let answers = _.values(this.state.answers);

            if(Object.keys(this.state.answers).indexOf(this.state.questionPack.questions[this.state.currentQuestionIndex+1]) === -1) {
                answers.push({ questionId: this.state.questionPack.questions[this.state.currentQuestionIndex+1], choice: null });
            }

            this.setState({
                ...this.state,
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                answers: _.mapKeys(answers, "questionId")
            });
        }
    }

    handlePause() {
        this.setState({
            ...this.state,
            isPause: !this.state.isPause
        });
    }

    render() {
        return (
            <Container fluid className={`question_pack ${this.state.isPause ? "pause" : ""}`}>
                <Row>
                    <Container>
                        <Col sm={{ size: 6, offset: 6 }} className="btn_menu_top">
                            <Button color="info" onClick={this.backToPpreviousQuestion} disabled={this.state.questionPackId && this.state.questionPack ? this.state.isPause || this.state.currentQuestionIndex <= 0 : true}>Back</Button>
                            <Button color="info" onClick={this.handlePause}>{ this.state.isPause ? "Resume" : "Pause" }</Button>
                            <Button color="info" onClick={this.goToNextQuestion} disabled={this.state.questionPackId && this.state.questionPack ? this.state.isPause || this.state.currentQuestionIndex + 1 >= this.state.questionPack.questions.length : true}>Skip</Button>
                            <Button color="info" onClick={this.submitTest} disabled={this.state.isPause}>Finish</Button>
                        </Col>
                    </Container>
                </Row>
                { this.state.isPause ? <Row className="pause_overlay"><Button color="info" onClick={this.handlePause}>Click to resume</Button></Row> : null }
                <Row>
                    <Container>
                        <TabContent activeTab={`${this.state.currentQuestionIndex}`}>
                            {this.renderTabsQuestion()}
                        </TabContent>
                    </Container>
                </Row>
                <Row>
                    <Container>
                        <Col md="4" className="text-left">Time spent on this question: </Col>
                        <Col md="4" className="text-center">{`${this.state.currentQuestionIndex + 1}/${this.state.questionPack.questions ? this.state.questionPack.questions.length : 0}`}</Col>
                        <Col md="4" className="text-right">Question set total time: {moment().startOf('day').seconds(this.state.totalTime).format('H:mm:ss')}</Col>
                    </Container>
                </Row>
            </Container>
        );
    }
}

function mapReducerToProps({ questionPackReducer, questionReducer, resultReducer }) {
    return { questionPackReducer, questionReducer, resultReducer };
}

export default connect(mapReducerToProps, { checkAnswers })(QuestionPackByIdPanel);