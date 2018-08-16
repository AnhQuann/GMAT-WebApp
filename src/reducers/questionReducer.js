import _ from 'lodash';
import { REMOVE_QUESTION, FETCH_QUESTIONS } from 'actions';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_QUESTIONS:
      return _.mapKeys(action.payload, "_id");
    case REMOVE_QUESTION:
      return _.omit(state, [action.payload]);
    default:
      return state;
  }
};