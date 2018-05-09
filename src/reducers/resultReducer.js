import _ from 'lodash';

import { CHECK_ANSWERS } from '../actions';
import { FETCH_RESULT } from '../actions';

export default function(state = { result: null }, action) {
  switch(action.type) {
    case FETCH_RESULT:
    case CHECK_ANSWERS:
        const result = action.payload;

        return {
            ...state,
            result: result
        };
    default:
        return state;
  }
};