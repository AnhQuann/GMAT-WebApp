import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QuestionListPanel from './QuestionListPanel';
import QuestionEditPanel from './QuestionEditPanel';

import './QuestionPanel.css';

class QuestionPanel extends Component {
  render() {
    return (
      <div className="question-panel">
        <Switch>
          <Route path="/lecturer/question/edit" component= { QuestionEditPanel } />
          <Route path="/lecturer/question" component={ QuestionListPanel } />
        </Switch>
      </div>
    );
  }
}

export default QuestionPanel;
