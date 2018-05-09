import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, TabContent, TabPane } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';

import Loading from '../common/Loading';
import { checkAnswers, selectQuestionPack, fetchUserInfo } from '../../actions';

import { ROUTER_RESULT } from '../../constants';

class QuestionPackByIdPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitResult: false,
            isPause: false,
            totalTime: 0,
            answers: _.mapKeys([], "_id"),
            currentQuestionIndex: 0,
            currentQuestionId: null,
            currentQuestionPack: null,
            isCheckResultDone: false
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
        this.setTimer = this.setTimer.bind(this);
    }

    componentWillMount() {
        this.props.fetchUserInfo();
        this.props.selectQuestionPack({ _id: this.props.match.params.id });
    }

    componentWillReceiveProps(newProps) {
        const reducer = newProps.currentQuestionPackReducer;

        if(reducer && !this.state.currentQuestionPack) {
            reducer.loadQuestionPack.then((questionPack) => {
                this.setState({
                    currentQuestionPack: questionPack,
                    currentQuestionId: questionPack.questions[this.state.currentQuestionIndex]._id,
                    answers: _.mapKeys([{ _id: questionPack.questions[0]._id, choice: null, time: 0 }], "_id")
                });

                this.setTimer();
            });
        }

        if(newProps.resultReducer.result && !this.state.isCheckResultDone && this.state.isSubmitResult) {
            console.log(this.state)
            this.setState({ isCheckResultDone: true });
            this.props.history.push(`${ROUTER_RESULT}/${newProps.resultReducer.result._id}`);
        }
    }

    componentWillUnmount() {
        if(this.timer) clearInterval(this.timer);
    }

    submitTest() {
        clearInterval(this.timer);
        this.setState({
            isSubmitResult: true
        });
        this.props.checkAnswers({
            questionPackId: this.state.currentQuestionPack._id,
            studentId: this.props.authReducer.user.id,
            answers: this.state.answers,
            totalTime: this.state.totalTime
        });
    }

    submitChoice(e) {
        e.preventDefault();
        let questionPack = this.state.currentQuestionPack;
        if( questionPack && this.state.currentQuestionIndex + 1 >= questionPack.questions.length) {
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
                answers: answers
            });
        }
    }

    handleSelectChoice(questionId, choice) {
        let answers = this.state.answers;

        if(answers[questionId]) {
            answers[questionId].choice = choice;

            this.setState({
                answers: answers
            });
        }
    }

    renderChoices(questionId, choices) {
        let answers = this.state.answers;
        let questionPack = this.state.currentQuestionPack;
        let currentQuestionIndex = this.state.currentQuestionIndex;
        let currentQuestionId = questionPack.questions[currentQuestionIndex]._id;

        return choices.map((choice, index) => {
            return (
                <FormGroup key={index} check>
                    <Label check>
                    <Input
                        checked={ Object.keys(answers).indexOf(`${currentQuestionId}`) > -1 && answers[currentQuestionId].choice == index ? true : false }
                        type="radio"
                        name={questionId}
                        value={index} onChange={(e) => { return this.handleSelectChoice(e.target.name, e.target.value) }}
                    />{' '} {choice}
                    </Label>
                </FormGroup>
            );
        });
    }

    renderTabsQuestion() {
        let answers = this.state.answers;
        let questionPack = this.state.currentQuestionPack;
        let currentQuestionIndex = this.state.currentQuestionIndex;
        let currentQuestionId = questionPack.questions[currentQuestionIndex]._id;

        if(questionPack.questions.length > 0) {
            return questionPack.questions.map((question, index) => {
                return (
                    <TabPane tabId={`${index}`} key={index}>
                        <Row>
                            <Col sm="12">
                                <Form onSubmit={this.submitChoice}>
                                    <p>{question.stimulus}</p>
                                    <p>{question.stem}</p>
                                    <FormGroup check row>
                                        {this.renderChoices(question._id, question.choices)}
                                    </FormGroup>
                                    <FormGroup check row className="form_menu">
                                        <Button disabled={answers[currentQuestionId] && answers[currentQuestionId].choice ? false : true} className="btn-success">Submit</Button>
                                        <div>
                                            <Button onClick={() => { this.clearChoice(currentQuestionId) }}>Clear answer</Button>
                                            {/* <Button disabled={answers[currentQuestionId] && answers[currentQuestionId].choice ? false : true}>Show answer</Button> */}
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
        let questionPack = this.state.currentQuestionPack;
        let currentQuestionIndex = this.state.currentQuestionIndex;

        if(questionPack && currentQuestionIndex > 0) {
            this.setState({
                currentQuestionIndex: currentQuestionIndex - 1,
                currentQuestionId: questionPack.questions[currentQuestionIndex - 1]._id
            });
        }
    }

    goToNextQuestion() {
        let answers = this.state.answers;
        let questionPack = this.state.currentQuestionPack;
        let currentQuestionIndex = this.state.currentQuestionIndex;

        if(questionPack && currentQuestionIndex + 1 < questionPack.questions.length) {
            let nextQuestionId = questionPack.questions[currentQuestionIndex+1]._id;

            if(Object.keys(answers).indexOf(nextQuestionId) === -1) {
                this.setState({
                    currentQuestionIndex: currentQuestionIndex + 1,
                    currentQuestionId: questionPack.questions[currentQuestionIndex + 1]._id,
                    answers: {
                        ...answers,
                        [nextQuestionId] :{ _id: nextQuestionId, choice: null, time: 0 }
                    }
                });
            } else {
                this.setState({
                    currentQuestionIndex: currentQuestionIndex + 1,
                    currentQuestionId: questionPack.questions[currentQuestionIndex + 1]._id
                });
            }
        }
    }

    handlePause() {
        this.setState({
            isPause: !this.state.isPause
        });
    }

    setTimer() {
        this.timer = setInterval(()=>{
            let answers = this.state.answers;
            let questionPack = this.state.currentQuestionPack || questionPack;

            if(!this.state.isPause) {
                let currentQuestionId = this.state.currentQuestionId;

                this.setState({
                    totalTime: this.state.totalTime + 1,
                    answers: {
                        ...answers,
                        [currentQuestionId]: {
                            ...answers[currentQuestionId],
                            time: answers[currentQuestionId].time + 1
                        }
                    }
                });
            }
        }, 1000);
    }

    render() {
        let answers = this.state.answers;
        let questionPack = this.state.currentQuestionPack;
        let currentQuestionIndex = this.state.currentQuestionIndex;
        let isPause = this.state.isPause;
        let isSubmitResult = this.state.isSubmitResult;

        if(!isSubmitResult && questionPack) {
            return (
                <Container fluid className={`question_pack ${isPause ? "pause" : ""}`}>
                    <Row>
                        <Container>
                            <Col sm={{ size: 6, offset: 6 }} className="btn_menu_top">
                                <Button color="info" onClick={this.backToPpreviousQuestion} disabled={isPause || currentQuestionIndex <= 0}>Back</Button>
                                <Button color="info" onClick={this.handlePause}>{ isPause ? "Resume" : "Pause" }</Button>
                                <Button color="info" onClick={this.goToNextQuestion} disabled={isPause || currentQuestionIndex + 1 >= questionPack.questions.length}>Skip</Button>
                                <Button color="info" onClick={this.submitTest} disabled={isPause}>Finish</Button>
                            </Col>
                        </Container>
                    </Row>
                    { isPause ? <Row className="pause_overlay"><Button color="info" onClick={this.handlePause}>Click to resume</Button></Row> : null }
                    <Row>
                        <Container>
                            <TabContent activeTab={`${this.state.currentQuestionIndex}`}>
                                {this.renderTabsQuestion()}
                            </TabContent>
                        </Container>
                    </Row>
                    <Row>
                        <Container>
                            <Col md="4" className="text-left">Time spent on this question: {moment().startOf('day').seconds(answers[questionPack.questions[currentQuestionIndex]._id].time).format('H:mm:ss')}</Col>
                            <Col md="4" className="text-center">{`${currentQuestionIndex + 1}/${questionPack.questions.length}`}</Col>
                            <Col md="4" className="text-right">Question set total time: {moment().startOf('day').seconds(this.state.totalTime).format('H:mm:ss')}</Col>
                        </Container>
                    </Row>
                </Container>
            );
        } else {
            return <Loading />
        }
    }
}

function mapReducerToProps({ currentQuestionPackReducer, authReducer, resultReducer }) {
    return { currentQuestionPackReducer, authReducer, resultReducer };
}

const actions = {
    checkAnswers,
    selectQuestionPack,
    fetchUserInfo
};

export default connect(mapReducerToProps, actions)(QuestionPackByIdPanel);