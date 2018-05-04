import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import QuestionPanel from './QuestionPanel';
import QuestionPackPanel from './QuestionPackPanel';

import { ROUTER_QUESTION_PACK, ROUTER_QUESTION } from '../../constants';
 
class LecturerPanel extends Component {
    render() {
        return (
            <Switch>
              <Route path="/lecturer/question" component={QuestionPanel} />
              <Route path="/lecturer/question-pack" component={QuestionPackPanel} />
            </Switch>
        )
    }
}
 
 
export default LecturerPanel;