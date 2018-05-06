import { SEARCH_QUESTION } from '../actions';
export default function(state = {}, action) {
  switch(action.type) {
    case SEARCH_QUESTION:
      console.log(action.payload);
      return action.payload;
    default: return state;
  }
};