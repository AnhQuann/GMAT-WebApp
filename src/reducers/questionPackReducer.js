import _ from "lodash";
import { LOAD_QUESTION_PACK, REMOVE_QUESTION_PACK } from '../actions';

const DEFAULT_STATE = {
  
};

const DUMMY_STATE = _.mapKeys([
  {
    id: 0,
    name: "CR1",
    questions: [
      2,
      1
    ]
  },
  {
    id: 1,
    name: "CR2",
    questions: [
      2,
      3,
      1
    ]
  },
  {
    id: 2,
    name: "CR3",
    questions: [
      3,
      1,
      2
    ]
  },
  {
    id: 3,
    name: "CR4",
    questions: [
      2,
      3,
      1
    ]
  },
  {
    id: 4,
    name: "CR5",
    questions: [
      2,
      1
    ]
  },
], 'id');

export default function(state = DUMMY_STATE, action) {
  switch(action.type) {
    case REMOVE_QUESTION_PACK:
      const questionPackToDelete = action.payload;
      return _.omit(state, questionPackToDelete.id);
    default: return state;
  }
};