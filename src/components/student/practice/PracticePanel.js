import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, TabContent, TabPane } from 'reactstrap';
import UserChoiceForm from './UserChoice.form';

import _ from 'lodash';
import moment from 'moment';
import progressBar, { Circle } from 'react-progressbar';

import { fetchQuestionPack, addResult } from 'networks';

import Loading from '../../common/Loading';

import { ROUTER_RESULT, QUESTION_DIFFICULTIES, VERBAL_QUESTION_DESCRIPTIONS } from '../../../constants';

class PracticePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
        ...this.state,
        isPause: false,
        totalTime: 0,
        idealTimeSpentPerQuestion: 108,
        currentQuestionIndex: 0,
        currentQuestionDetailIndex: 0,
        userChoice: -1,
        finished: false
    };

    this.answers = [];

    this.renderTabsQuestion = this.renderQuestion.bind(this);
    this.onSubmitUserChoice = this.onSubmitUserChoice.bind(this);
    this.backToPreviousQuestion = this.backToPreviousQuestion.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.submitChoice = this.submitChoice.bind(this);
    this.submitTest = this.submitTest.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    if(id) {
      fetchQuestionPack(id).then((questionPack) => {
        this.answers = [{
          choice: -1,
          question: questionPack.questions[0]._id,
          time: 0
        }];

        this.setState({
          questionPack: {
            ...questionPack,
            questions: questionPack.questions.filter((question) => !!question.details)
          }
        });
        this.startTimer();
      });
    }
  }

  startTimer() {
    this.timer = setInterval(()=>{
      if(!this.state.isPause) {
          if(this.answers[this.state.currentQuestionIndex]) this.answers[this.state.currentQuestionIndex].time += 1;
          this.setState({
              ...this.state,
              totalTime: this.state.totalTime + 1
          });
      }
    }, 1000);
  }

  submitTest() {
    clearInterval(this.timer);
    let newResult = {
      answers: this.answers,
      questionPack: this.state.questionPack._id
    }
    addResult(newResult).then((resultId) => {
      this.props.history.push(`${ROUTER_RESULT}/${resultId}`);
    });
  }

  submitChoice() {
    
  }

  currentQuestionDetailIsLast() {
    const question = this.state.questionPack.questions[this.state.currentQuestionIndex];
    const currentQuestionDetailIndex = this.state.currentQuestionDetailIndex;
    return currentQuestionDetailIndex === question.details.length - 1;
  }

  currentQuestionIsLast() {
    return this.state.currentQuestionIndex === this.state.questionPack.questions.length - 1;
  }

  onSubmitUserChoice({choice}) {
    if(!this.currentQuestionDetailIsLast()) {
      this.setState({
        currentQuestionDetailIndex: this.state.currentQuestionDetailIndex + 1
      });
    } else if(!this.currentQuestionIsLast()) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        currentQuestionDetailIndex: 0
      })
    } else {
      // TODO: Submit test here
    }
  }

  renderQuestion() {
    const questionPack = this.state.questionPack;
    if (!questionPack) return (<Loading />);
    if(!questionPack.questions || questionPack.questions.length == 0) return (<div>This pack does not have any questions</div>);
    const question = questionPack.questions[this.state.currentQuestionIndex];
    const stimulus = question.stimulus;
    const detail = question.details[this.state.currentQuestionDetailIndex];
    const { stem, choices } = detail;
    return (
      <div>
        <div className="question_title">
          Verbal :: {VERBAL_QUESTION_DESCRIPTIONS[question.type]} :: {question._id}
        </div>
        <div>
        <p dangerouslySetInnerHTML={{ __html: stimulus}} />  
        </div>
        <div>
          <p dangerouslySetInnerHTML={{ __html: stem}} />       
        </div>
        <UserChoiceForm
          onSubmit={this.onSubmitUserChoice}
          choices={choices}
          initialValues={{choice: -1}}
        />
      </div>
    );
  }

  backToPreviousQuestion() {
    if(this.state.questionPack && this.state.currentQuestionIndex > 0) {
      this.setState({
        ...this.state,
        currentQuestionIndex: this.state.currentQuestionIndex - 1,
        userChoice: this.answers[this.state.currentQuestionIndex - 1].userChoice
      });
    }
  }

  goToNextQuestion() {
    let nextQuestion = this.answers[this.state.currentQuestionIndex + 1];
    if(!nextQuestion) {
      this.answers.push({
        question: this.state.questionPack.questions[this.state.currentQuestionIndex + 1]._id,
        choice: -1,
        time: 0
      });
    }
    
    this.setState({
      ...this.state,
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
      userChoice: nextQuestion ? nextQuestion.userChoice : -1
    });
  }

  saveUserChoice(questionIndex, questionId, userChoice) {
    this.answers[questionIndex].question = questionId;
    this.answers[questionIndex].choice = userChoice;
  }

  currentQuestion() {
    return this.state.questionPack.questions[this.state.currentQuestionIndex];
  }

  handlePause() {
    this.setState({
      ...this.state,
      isPause: !this.state.isPause
    });
  }

  render() {
    const questionPack = this.state.questionPack;
    const isPause = this.state.isPause;
    const currentQuestionIndex = this.state.currentQuestionIndex;
    const currentQuestion = this.answers[currentQuestionIndex];
    if(!questionPack && !this.state.finished) return (<Loading />);
    return (
      <Container fluid className={`question_pack ${isPause ? "pause" : ""}`}>
        <Row>
          <Container>
            <Col sm={{ size: 6, offset: 6 }} className="btn_menu_top">
              <Button color="info" onClick={this.backToPreviousQuestion} disabled={isPause || currentQuestionIndex <= 0}>Back</Button>
              <Button color="info" onClick={this.handlePause}>{ isPause ? "Resume" : "Pause" }</Button>
              <Button color="info" onClick={this.goToNextQuestion} disabled={isPause || currentQuestionIndex + 1 >= questionPack.questions.length}>Skip</Button>
              <Button color="info" onClick={this.submitTest} disabled={isPause}>Finish</Button>
            </Col>
          </Container>
        </Row>
        { isPause ? <Row className="pause_overlay"><Button color="info" onClick={this.handlePause}>Click to resume</Button></Row> : null }
        <Row>
          <Col sm="12">
            <Container>
              {this.renderQuestion()}
            </Container>
          </Col>
        </Row>
        <Row>
          <Container>
            {/* <Col md="4" className={`text-left ${currentQuestion.time < this.state.idealTimeSpentPerQuestion ? 'green_text' : 'red_text'}`}><span>Time spent on this question:</span> <span>{moment().startOf('day').seconds(currentQuestion.time).format(`${currentQuestion.time > 3600 ? 'H:mm:ss' : 'm:ss'}`)}</span> </Col>
            <Col md="4" className="text-center">{`Question ${currentQuestionIndex + 1}/${questionPack.questions ? questionPack.questions.length : 0}`}</Col>
            <Col md="4" className={`text-right ${currentQuestion.time < this.state.idealTimeSpentPerQuestion*questionPack.questions.length ? 'green_text' : 'red_text'}`}><span>Question set total time:</span> <span>{moment().startOf('day').seconds(this.state.totalTime).format(`${this.state.totalTime > 3600 ? 'H:mm:ss' : 'm:ss'}`)}</span> </Col> */}
          </Container>
        </Row>
      </Container>
    );
  }
}

export default PracticePanel;
