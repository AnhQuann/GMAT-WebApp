import React, { Component } from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import _ from 'lodash';

import { tryGet, elipsis } from '../../utils';

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
          <Button size="sm" color="secondary" className="">Add new question</Button>
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
        <FormGroup key={index} className="d-flex align-items-center mt-4">
          <span className="h6 mr-2">{parseInt(index) + 1}.</span>
          <Input defaultValue={ elipsis(question.stimulus) } disabled></Input>
          <i 
            className="fas fa-times ml-2 text-danger pointer"
            onClick={ () => this.removeQuestion(parseInt(index)) }
            >
          </i>
        </FormGroup>
      )
    }
}
 
 
export default QuestionPackQuestionListPanel;