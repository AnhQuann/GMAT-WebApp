import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DEFAULT_QUESTION_VALUE } from 'statics';
import QForm from './Q.form';
import { addQuestion } from 'actions';
 
class QAddPanel extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSubmit(question) {
    this.props.addQuestion(question, this.props.history.goBack);
  }

  onCancel() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <h3>Add question</h3>
        <QForm
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          initialValues={DEFAULT_QUESTION_VALUE} 
        />
      </div>
    );
  }
} 
 
export default connect(null, { addQuestion })(QAddPanel);