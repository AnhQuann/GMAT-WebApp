import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QuestionPanel from '../question/QuestionPanel';
import QuestionPackPanel from '../question-pack/QuestionPackPanel';

import './LecturerPanel.css';

class LecturerPanel extends Component {

  render() {
    return (
      <div className="lecturer-panel">
        <Switch>
          <Route path="/lecturer/question" component={QuestionPanel} />
          <Route path="/lecturer/question-pack" component={QuestionPackPanel} />
        </Switch>
      </div>
    );
  }
}

export default LecturerPanel;