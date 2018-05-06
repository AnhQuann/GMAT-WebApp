import React, { Component } from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import _ from 'lodash';

import { tryGet, elipsis } from '../../utils';

import './QuestionPackQuestionListPanel.css';

class QuestionPackQuestionListPanel extends Component {
    constructor(props) {
      super(props);
      this.removeQuestion = this.removeQuestion.bind(this);
    }

    componentWillMount() {
      this.setState({
        questions: _.cloneDeep(this.props.defaultValue)
      });
    }

    componentDidUpdate(prevProps, prevState) {
      this.props.questionsDidUpdate(this.state.questions);
    }

    removeQuestion(removeIndex) {
      const newQuestions = this.state.questions.filter((question, index) => index != removeIndex);
      this.setState({
        questions: newQuestions
      });
    }

    render() {
      const questions = this.state.questions;
      return (
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <span className="legend" >Questions</span>
            <Button size="sm" color="secondary" className="ml-2">Add new question</Button>
          </div>
          <FormGroup>
            {
              questions.map((question, index) => this.renderQuestion(question, index))
            }
          </FormGroup>
        </div>
      );
    }

    renderQuestion(question, index) {
      return (
        <FormGroup key={index} className="question-wrapper">
          <span className="question-no">{parseInt(index) + 1}.</span>
          <span className="question-stimulus">{elipsis(question.stimulus)}</span>
          <i 
            className="fas fa-times ml-2 text-danger pointer question-remove"
            onClick={ () => this.removeQuestion(parseInt(index)) }
            >
          </i>
        </FormGroup>
      )
    }
}
 
 
export default QuestionPackQuestionListPanel;