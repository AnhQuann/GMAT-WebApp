import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';

import QuestionPackListPanel from './QuestionPackListPanel';
import QuestionPackEditPanel from './QuestionPackEditPanel';
import { ROUTER_QUESTION_PACK, ROUTER_QUESTION_PACK_EDIT_OR_ADD } from '../../constants';
 
class QuestionPackPanel extends Component {
  render() {
    return (
      <Switch>
        <Route path={ROUTER_QUESTION_PACK_EDIT_OR_ADD} component={QuestionPackEditPanel} />
        <Route path={ROUTER_QUESTION_PACK} component={QuestionPackListPanel} />
      </Switch>
    );
  }
}
 
export default QuestionPackPanel;