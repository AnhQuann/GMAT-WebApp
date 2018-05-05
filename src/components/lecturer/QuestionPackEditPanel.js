import _ from 'lodash';
import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';
import QuestionPackQuestionListPanel from './QuestionPackQuestionListPanel';

import EditPanel from '../common/EditPanel';

import './QuestionEditPanel.css';
 
class QuestionPackEditPanel extends EditPanel {
  constructor(props) {
    super(props);
  }

    componentWillMount() {
      this.setState(_.cloneDeep(this.props.currentQuestionPackReducer));
    }

    render() {
        return (
          <div className="panel">
            <h3>Edit question pack</h3>
            <FormGroup>
              <legend>Name</legend>
              <Input defaultValue={this.tryGet("name", "")} />
            </FormGroup>
            <FormGroup>
              <legend>Questions</legend>
              <QuestionPackQuestionListPanel 
                defaultValue={this.tryGet("questions", [])}
              />
            </FormGroup>
            <FormGroup className="d-flex justify-content-end">
              <Button color="secondary mr-2" >Cancel</Button>
              <Button color="primary">OK</Button>
            </FormGroup>
          </div>
        );
    }
}

function mapReducerToProps({ currentQuestionPackReducer }) {
  return { currentQuestionPackReducer };
}
 
export default connect(mapReducerToProps)(QuestionPackEditPanel);