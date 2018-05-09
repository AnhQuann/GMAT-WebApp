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
      this.props.history.goBack();
    });
    this.handleCancel = (() => this.props.currentQuestionPackReducer.handleCancel());
  }

  componentWillReceiveProps(nextProps) {
    this.updateValues = _.cloneDeep(nextProps.currentQuestionPackReducer.questionPack);
  }

  render() {
    const currentQuestionPackReducer = this.props.currentQuestionPackReducer;
    const questionPack = currentQuestionPackReducer.questionPack;

    if (!questionPack) {
      return (<div>Loading...</div>);
    }
    
    return (
      <div className="panel">
        <h3>{ this.props.currentQuestionPackReducer.title }</h3>
        <FormGroup>
          <legend>Name</legend>
          <Input defaultValue={ questionPack.name } onBlur={this.blurToProp("updateValues.name")}/>
        </FormGroup>
        <FormGroup>
          <QPackQuestionListPanel 
            defaultValue={questionPack.questions}
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