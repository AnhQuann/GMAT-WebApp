import _ from 'lodash';
import React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import QPackQuestionListPanel from './QPackQuestionListPanel';

import EditPanel from '../common/EditPanel';

import './QPackEditPanel.css';
 
class QPackEditPanel extends EditPanel {

  constructor(props) {
    super(props);
    this.handleOK = (() => {
      this.props.currentQuestionPackReducer.handleOK(this.updateValues);
    }).bind(this);
    this.handleCancel = (() => this.props.currentQuestionPackReducer.handleCancel());
  }

  componentWillMount() {
    this.updateValues = _.cloneDeep(this.props.currentQuestionPackReducer.questionPack);
  }

  render() {
    return (
      <div className="panel">
        <h3>{ this.props.currentQuestionPackReducer.title }</h3>
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
          <Button color="secondary mr-2" onClick={this.handleCancel} >Cancel</Button>
          <Button color="primary" onClick={this.handleOK} >OK</Button>
        </FormGroup>
      </div>
    );
  }
}

function mapReducerToProps({ currentQuestionPackReducer }) {
  return { currentQuestionPackReducer };
}
 
export default connect(mapReducerToProps)(QPackEditPanel);