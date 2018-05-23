import React, { Component } from 'react';
import { connect } from 'react-redux';

import QCRForm from './QCRForm';
import { addQuestion } from '../../actions';
 
class QAddPanel extends Component {
  constructor(props) {
    super(props);
    this.defaultQuestion = {
      stimulus: "",
      details: [{
        stem: "",
        choices: ["", "", "", "", ""],
        rightChoice: 0,
        explanation: "",
        difficulty: 0,
      }],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(question) {
    // console.log(question);
    this.props.addQuestion(question, this.props.history.goBack);
  }

  onCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <h3>Add question</h3>
        <QCRForm
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          question={this.defaultQuestion} />
      </div>
    );
  }
} 
 
export default connect(null, { addQuestion })(QAddPanel);