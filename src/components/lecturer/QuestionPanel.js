import React, { Component } from 'react';
import { connect } from 'react-redux';

import "./QuestionPanel.css";

class QuestionPanel extends Component {

  render() {
      return (
          <div className="question-panel">
            <table className="table table-stripped">
              <thead className="">
                <tr className="">
                  <th className="th-no">#</th>
                  <th className="th-stimulus">Stimulus</th>
                  <th className="th-difficulty">Difficulty</th>
                </tr>
              </thead>
              <tbody className="container">
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
          <td scope="col" className="td-no">{ index + 1 } </td>
          <td scope="col" className="td-stimulus">{ this.elipsis(question.stimulus) }</td>
          <td scope="col" className="td-difficulty">{ this.renderDifficulty(question.difficulty) }</td>
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

  elipsis(text) {
    if(text.length > 100) {
      return text.substring(0, 100) + "...";
    } else {
      return text;
    }
  }
}

function mapReducerToProps( { questionReducer } ) {
  return { questionReducer };
}

export default connect(mapReducerToProps)(QuestionPanel);
