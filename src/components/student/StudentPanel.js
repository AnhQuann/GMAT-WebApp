import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QuestionPackListPanel from './QuestionPackListPanel';
import QuestionPackByIdPanel from './QuestionPackByIdPanel';
import ResultPanel from './ResultPanel';
import RContainer from './review/RContainer';

import { ROUTER_STUDENT, ROUTER_PACK_PARAM_ID, ROUTER_RESULT_PARAM_ID, ROUTER_REVIEW } from 'statics';

import './StudentPanel.css';

class StudentPanel extends Component {
  render() {
    return (
      <Switch>
        <Route path={ROUTER_PACK_PARAM_ID} component={QuestionPackByIdPanel} />
        <Route path={ROUTER_RESULT_PARAM_ID} component={ResultPanel} />
        <Route path={`${ROUTER_REVIEW}/:id`} component={RContainer} />
        <Route path={ROUTER_STUDENT} component={QuestionPackListPanel} />
      </Switch>
    );
  }
}

export default StudentPanel;