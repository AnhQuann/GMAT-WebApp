import React, { Component } from 'react';

import { connect } from 'react-redux';

import QForm from './Q.form';

import { editQuestion } from 'actions';
import { fetchQuestion } from 'networks';

import "./QEditPanel.css";
 
class QuestionEditPanel extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      question: null
    };
  }

  componentDidMount() {
    const questionId = this.props.match.params.id;
    fetchQuestion(questionId).then((question) => {
      this.setState({
        question
      });
    });
  }

  render() {
    if(!this.state.question) return (<div>Loading...</div>);
    
    return (
      <div>
        <h3>Edit question</h3>
        <QForm
          initialValues={this.state.question}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          editForm
        />
      </div>
    );
  }

  onSubmit(question) {
    this.props.editQuestion(question, this.props.history.goBack);
  }

  onCancel() {
    this.props.history.goBack();
  }
}

function mapReducerToProps({ questionReducer }) {
  return { questionReducer }
}

const actions = {
  editQuestion
};
 
export default connect(mapReducerToProps, actions)(QuestionEditPanel);