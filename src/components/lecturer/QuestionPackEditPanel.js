import _ from 'lodash';
import React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import QPackQuestionListPanel from './QPackQuestionListPanel';

import EditPanel from '../common/EditPanel';

import './QuestionEditPanel.css';
 
class QuestionPackEditPanel extends EditPanel {

  componentWillMount() {
    this.updateValues = _.cloneDeep(this.props.currentQuestionPackReducer);
  }

  render() {
    return (
      <div className="panel">
        <h3>Edit question pack</h3>
        <FormGroup>
          <legend>Name</legend>
          <Input defaultValue={this.tryGetProp("updateValues.name", "")} onBlur={this.blurToProp("updateValues.name")}/>
        </FormGroup>
        <FormGroup>
          <QPackQuestionListPanel 
            defaultValue={this.tryGetProp("updateValues.questions", [])}
            questionsDidUpdate={this.assignToProp("updateValues.questions")}
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