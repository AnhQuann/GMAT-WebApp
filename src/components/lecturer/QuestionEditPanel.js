import React, { Component } from 'react';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';

import { connect } from 'react-redux';
import { QUESTION_DIFFICULTIES, CHOICE_LETTERS } from '../../constants';

import "./QuestionEditPanel.css";
 
class QuestionEditPanel extends Component {
    render() {
      return (
        <div>
          { this.renderForm() }
        </div>
      );
    }

    renderForm() {
      const question = this.props.currentQuestionReducer;
      
      if(!question) {
        return (
          <div>Select a question to edit</div>
        );
      }
      
      return (
        <Form>
          <FormGroup>
            <legend>Stimulus</legend>
            <Input type="textarea" defaultValue={question.stimulus}></Input>
          </FormGroup>
          <FormGroup>
            <legend>Stem</legend>
            <Input type="text" defaultValue={ question.stem }></Input>
          </FormGroup>
          <FormGroup>
            <legend>Choices</legend>
            { this.renderChoicesInForm(question) }
          </FormGroup>
          <FormGroup>
            <legend>Right choice</legend>
            { this.renderRightChoiceInForm(question) }
          </FormGroup>
          <FormGroup>
            <legend>Explanation</legend>
            <Input type="textarea" defaultValue={question.explanation} ></Input>
          </FormGroup>
          <FormGroup>
            <legend>Difficulty level</legend>
            { this.renderDifficulty(question) }
          </FormGroup>
          <FormGroup className="clearfix float-right">
            <Button>Cancel</Button>
            <Button className="ml-1" color="primary">OK</Button>
          </FormGroup>
        </Form>
      );
    }
    
    renderLabel(label) {
      return (
        <Label>
          <h5> { label }</h5>
        </Label>
      );
    }

    renderChoicesInForm(question) {
      return question.choices.map((choice, index) => {
        return (
          <div className="choice-input-wrapper">
            <span>{ CHOICE_LETTERS[index] }. </span>
            <Input className="mb-1" key={index} defaultValue={choice} ></Input>
          </div>
        );
      });
    }

    renderRightChoiceInForm(question) {
      const choices = ['A', 'B', 'C', 'D', 'E'];
      return (
        <Input type="select" defaultValue={question.rightChoice}>
          {choices.map((choice, index) => {
            return (
              (<option key={index} value={index}> {choice} </option>)
            );
          })}
        </Input>
      );
    }
    
    renderDifficulty(question) {
      return (
        <Input type="select">
          {QUESTION_DIFFICULTIES.map((questionDifficulty, index) => {
            return (<option key={questionDifficulty.value} value={questionDifficulty.value}>{ questionDifficulty.text }</option>);
          })}
        </Input>
      );
    }
}

function mapReducerToProps({ currentQuestionReducer }) {
  return { currentQuestionReducer }
}
 
export default connect(mapReducerToProps)(QuestionEditPanel);