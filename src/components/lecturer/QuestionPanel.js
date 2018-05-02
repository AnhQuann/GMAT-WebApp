import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./QuestionPanel.css";

class QuestionPanel extends Component {

  render() {
      return (
          <div className="question-panel">
            <table>
              <thead className="container">
                <tr>
                  <th>#</th>
                  <th>Stimulus</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                { this.renderQuestions(this.props.questionReducer) }
              </tbody>
            </table>
          </div>
      )
  }

  renderQuestions(questions) {
    return questions.map((question, index) => {
      return (
        <tr key={index}>
          <td>{ index + 1 } </td>
          <td>{ question.stimulus }</td>
          <td>{ this.renderDifficulty(question.difficulty) }</td>
        </tr>
      );
    });
  }

  renderDifficulty(difficulty) {
    switch(difficulty) {
      case 0: return (<span className="q-easy">Easy</span>);
      case 1: return (<span className="q-medium">Easy</span>);
      case 2: return (<span className="q-hard">Hard</span>);
      case 3: return (<span className="q-very-hard">Very hard</span>);
      default: return (<span>Unknown</span>);
    }
  }
}

function mapReducerToProps( { questionReducer } ) {
  return { questionReducer };
}

export default connect(mapReducerToProps)(QuestionPanel);
