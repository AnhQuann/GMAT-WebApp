import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class QuestionPanel extends Component {

  renderQuestion(question, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{question.stimulus}</td>
        <td>{question.stem}</td>
      </tr>
    );
  }
  
  renderQuestions() {
    const questions = this.props.questionReducer.questions;
    return (
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Stimulus</th>
            <th>Stem</th>
            <th>Packs</th>
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
    return (
      <div className="question-panel">
        {this.renderQuestions()}
      </div>
    );
  }
}

function mapReducerToProps({ questionReducer }) {
  return { questionReducer };
}
 
export default connect(mapReducerToProps)(QuestionPanel);