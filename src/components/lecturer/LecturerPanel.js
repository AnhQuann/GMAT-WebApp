import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import QPanel from './question/QPanel';
import QPackPanel from './questionpack/QPackPanel';
import StdPanel from './student/StdPanel';
import CRoomPanel from './classroom/CRoom.panel';
import NavBar from '../navbar/NavBar';

import { ROUTER_QUESTION_PACK, ROUTER_QUESTION, ROUTER_STUDENT_MANAGEMENT, ROUTER_CLASS_ROOM } from 'statics';
 
class LecturerPanel extends Component {
    render() {
        return (
          <div className="w-100 full-height">
            <NavBar/>
            <Switch>
              <Route path={ROUTER_QUESTION} component={QPanel} />
              <Route path={ROUTER_QUESTION_PACK} component={QPackPanel} />
              <Route path={ROUTER_STUDENT_MANAGEMENT} component={StdPanel} />
              <Route path={ROUTER_CLASS_ROOM} component={CRoomPanel} />
            </Switch>
          </div>
        )
    }
}
 
 
export default LecturerPanel;