import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import QuestionPanel from './QuestionPanel';
import QuestionPackPanel from './QuestionPackPanel';
import QuestionDetail from './QuestionDetail';
 
class LecturePanel extends Component {
    render() {
        return (
            <Switch>
                <Route path='/lecturer/question' component = {QuestionPanel}></Route>
                <Route path='/lecturer/question-pack' component = {QuestionPackPanel}></Route>
                <Route path='/lecturer/question-detail' component = {QuestionDetail}></Route>
            </Switch>
        )
    }
}
 
 
export default LecturePanel;