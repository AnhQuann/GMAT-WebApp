import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QListPanel from './QListPanel';
import QEditPanel from './QEditPanel';
import QAddPanel from './QAddPanel';

import './QPanel.css';

<<<<<<< HEAD
import { ROUTER_QUESTION_EDIT_OR_ADD, ROUTER_QUESTION_ADD, ROUTER_QUESTION_EDIT_PARAM_ID, ROUTER_QUESTION } from '../../constants';
=======
import { ROUTER_QUESTION_EDIT_OR_ADD, ROUTER_QUESTION_ADD, ROUTER_QUESTION_EDIT, ROUTER_QUESTION } from 'statics';
>>>>>>> 95111f201d2e8d32bfecd25b542b95f0fd686c09

class QPanel extends Component {
  render() {
    return (
      <div className="question-panel full-height">
        <Switch>
          <Route path={ROUTER_QUESTION_ADD} component = {QAddPanel} />
          <Route path={ROUTER_QUESTION_EDIT_PARAM_ID} component= { QEditPanel } />
          <Route path={ROUTER_QUESTION} component={ QListPanel } />
        </Switch>
      </div>
    );
  }
}

export default QPanel;
