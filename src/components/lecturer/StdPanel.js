import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StdAddPanel from './StdAddPanel';
import StdEditPanel from './StdEditPanel';
import StdListPanel from './StdListPanel';

import { ROUTER_STUDENT_MANAGEMENT, ROUTER_STUDENT_MANAGEMENT_ADD, ROUTER_STUDENT_MANAGEMENT_EDIT } from '../../constants';

export default function(props) {
  return (<Switch>
    <Route path={ROUTER_STUDENT_MANAGEMENT_ADD} component={StdAddPanel} />
    <Route path={ROUTER_STUDENT_MANAGEMENT_EDIT} component={StdEditPanel} />
    <Route path={ROUTER_STUDENT_MANAGEMENT} component={StdListPanel} />
  </Switch>);
}