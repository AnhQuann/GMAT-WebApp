import _ from 'lodash';

import { CHECK_ANSWERS } from '../actions';
import { DUMMY_QUESTIONS } from './questionReducer';

export default function(state = {}, action) {
  switch(action.type) {
    case CHECK_ANSWERS:
        let questionList = DUMMY_QUESTIONS;

        let result = _.values(action.payload.answers).map(e => {
            if(typeof questionList[e.questionId] !== 'undefined'){
                let question = questionList[e.questionId];
                return {
                    questionId: question.id,
                    difficulty: question.difficulty,
                    response: e.choice != null ? question.rightChoice == e.choice : null
                };
            }
        });
        return {
            ...state,
            result: _.mapKeys(result, "questionId"),
            totalTime: action.payload.totalTime ? action.payload.totalTime : 0
        };
    default:
        return state;
  }
};