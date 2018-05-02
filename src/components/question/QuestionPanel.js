import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionEditModal from './QuestionEditModal';

import './QuestionPanel.css';
 
class QuestionPanel extends Component {

  constructor(props) {
    super(props);
    this.openEditDialog = this.openEditDialog.bind(this);
  }

  componentWillMount() {
    this.setState({
      dialogOpen: false
    });
  }

  renderQuestion(question, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{question.stimulus}</td>
        <td>{question.stem}</td>
        <td></td>
        <td className="question-action">
          <span onClick={this.openEditDialog}>Edit</span>
          <span>Delete</span>
        </td>
      </tr>
    );
  }

  openEditDialog() {
    this.setState({
      dialogOpen: true
    });
  }
  
  renderQuestions() {
    const questions = this.props.questionReducer.questions;
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Stimulus</th>
            <th>Stem</th>
            <th>Packs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            return this.renderQuestion(question, index)
          })}
        </tbody>
      </table>
    );
  }

  render() {
    // const dialogOpen = this.state.dialogOpen;
    return (
      <div className="question-panel">
        <QuestionEditModal isOpen={this.state.dialogOpen} />
        {this.renderQuestions()}
      </div>
    );
  }
}

function mapReducerToProps({ questionReducer }) {
  return { questionReducer };
}
 
export default connect(mapReducerToProps)(QuestionPanel);