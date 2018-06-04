import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label, TabContent, TabPane } from 'reactstrap';

import _ from 'lodash';
import moment from 'moment';
import progressBar, { Circle } from 'react-progressbar';

import { fetchQuestionPack, addResult } from 'networks';

import './PracticePanel.css';

import Loading from '../../common/Loading';

import { ROUTER_RESULT, QUESTION_DIFFICULTIES, VERBAL_QUESTION_DESCRIPTIONS } from 'statics';
import Time from '../../common/Time';
import QuestionContent from './QuestionContent';
import RCQuestionContent from './RCQuestionContent';
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
        finished: false
    };

    this.answers = [];

    this.renderTabsQuestion = this.renderQuestion.bind(this);
    this.backToPreviousQuestion = this.backToPreviousQuestion.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.onSubmitUserChoice = this.onSubmitUserChoice.bind(this);
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

        const questions = questionPack.questions.filter((question) => !!question.details);
        this.answers = questions.map((question, index) => {
          return {
            question: question._id,
            userChoices: question.details.map((detail, index) => {
              return {
                choice: -1,
                time: 0
              }
            })
          }
        });

        this.setState({
          questionPack: {
            ...questionPack,
            questions
          }
        });
        this.startTimer();
      });
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      const currentQuestionIndex = this.state.currentQuestionIndex;
      const currentQuestionDetailIndex = this.state.currentQuestionDetailIndex;

      if(!this.state.isPause) {
          this.answers[currentQuestionIndex].userChoices[currentQuestionDetailIndex].time += 1;
          this.setState({
              ...this.state,
              totalTime: this.state.totalTime + 1
          });
      }
    }, 1000);
  }

  submitTest() {
    clearInterval(this.timer);
    this.setState({
      finished: true
    });
    let result = {
      answers: this.answers,
      questionPack: this.state.questionPack._id
    }
    addResult(result).then((resultId) => {
      this.props.history.push(`${ROUTER_RESULT}/${resultId}`);
    });
  }

  currentQuestionDetailIsLast() {
    const question = this.state.questionPack.questions[this.state.currentQuestionIndex];
    const currentQuestionDetailIndex = this.state.currentQuestionDetailIndex;
    return currentQuestionDetailIndex === question.details.length - 1;
  }

  currentQuestionDetailIsFirst() {
    return this.state.currentQuestionDetailIndex === 0;
  }

  currentQuestionIsLast() {
    return this.state.currentQuestionIndex === this.state.questionPack.questions.length - 1;
  }

  currentQuestionIsFirst() {
    return this.state.currentQuestionIndex === 0;
  }

  currentUserChoice() {
    const { currentQuestionIndex, currentQuestionDetailIndex } = this.state;
    return this.answers[currentQuestionIndex].userChoices[currentQuestionDetailIndex];
  }

  onSubmitUserChoice({choice}) {
    this.currentUserChoice().choice = choice;
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
      this.submitTest()
    }
  }

  renderQuestion() {
    const questionPack = this.state.questionPack;
    const question = questionPack.questions[this.state.currentQuestionIndex];
    const stimulus = question.stimulus;
    const detail = question.details[this.state.currentQuestionDetailIndex];
    const { stem, choices } = detail;
    return (
      <div className="practice-panel">
        <div className="question-title">
          Verbal :: {VERBAL_QUESTION_DESCRIPTIONS[question.type]} :: {question._id}
        </div>
        {
          question.type !== "RC" ?
          <QuestionContent
            stimulus={stimulus}
            stem={stem}
            choices={choices}
            currentUserChoice={this.currentUserChoice().choice}
            onSubmitUserChoice={this.onSubmitUserChoice}
          />
          :
          <RCQuestionContent
            stimulus={stimulus}
            stem={stem}
            choices={choices}
            currentUserChoice={this.currentUserChoice().choice}
            onSubmitUserChoice={this.onSubmitUserChoice}
          />
        }
      </div>
    );
  }

  backToPreviousQuestion() {
    const { 
      currentQuestionIndex,
      currentQuestionDetailIndex,
      questionPack : { questions }
    } = this.state;
    if(!this.currentQuestionDetailIsFirst()) {
      this.setState({
        currentQuestionDetailIndex: currentQuestionDetailIndex - 1,
      });
    } else if(!this.currentQuestionIsFirst()) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex - 1,
        currentQuestionDetailIndex: questions[currentQuestionIndex - 1].details.length - 1
      })
    }
  }

  goToNextQuestion() {
    const { currentQuestionIndex, currentQuestionDetailIndex } = this.state;
    if(!this.currentQuestionDetailIsLast()) {
      this.setState({
        currentQuestionDetailIndex: currentQuestionDetailIndex + 1
      });
    } else if(!this.currentQuestionIsLast()) {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
        currentQuestionDetailIndex: 0
      })
    }
  }

  handlePause() {
    this.setState({
      ...this.state,
      isPause: !this.state.isPause
    });
  }

  render() {
    const questionPack = this.state.questionPack;
    
    if (!questionPack || this.state.finished)
      return (<Loading />);
    
    if(!questionPack.questions || questionPack.questions.length == 0)
      return (<div>This pack does not have any questions</div>);

    const {
      isPause,
      currentQuestionIndex,
      currentQuestionDetailIndex
    } = this.state;

    const currentChoice = this.currentUserChoice()
    const questionCount = questionPack.questions.length;
    const isOvertime = currentChoice.time < this.state.idealTimeSpentPerQuestion * questionCount;
    const isOvertimeForCurrentQuestion = currentChoice.time < this.state.idealTimeSpentPerQuestion;
    return (
      <div className={`question_pack ${isPause ? "pause" : ""}`}>
        <div className="control-panel w-100">
          <div className="btn_menu_top">
            <Button color="info" onClick={this.backToPreviousQuestion} disabled={isPause || (this.currentQuestionIsFirst() && this.currentQuestionDetailIsFirst())}>Back</Button>
            <Button color="info" onClick={this.handlePause}>{ isPause ? "Resume" : "Pause" }</Button>
            <Button color="info" onClick={this.goToNextQuestion} disabled={isPause || (this.currentQuestionIsLast() && this.currentQuestionDetailIsLast())}>Skip</Button>
            <Button color="info" onClick={this.submitTest} disabled={isPause}>Finish</Button>
          </div>
        </div>
        { isPause ? <Row className="pause_overlay"><Button color="info" onClick={this.handlePause}>Click to resume</Button></Row> : null }
        <Container>
          {this.renderQuestion()}
        </Container>
        <Row>
          <Container>
            <Col
              md="4"
              className={`text-left ${isOvertimeForCurrentQuestion ? 'green_text' : 'red_text'}`}
            >
              <span>Time spent on this question:</span>
              <Time value={currentChoice.time} />
            </Col>
            <Col
              md="4"
              className="text-center"
            >
              {`Question ${currentQuestionIndex + 1}/${questionCount}`}
            </Col>
            <Col
              md="4"
              className={`text-right ${isOvertime ? 'green_text' : 'red_text'}`}
            >
              <span> Question set total time: </span>
              <Time value={this.state.totalTime} />
            </Col>
          </Container>
        </Row>
      </div>
    );
  }
}

export default PracticePanel;
