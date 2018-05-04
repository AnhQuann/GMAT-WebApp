import _ from "lodash";
import { LOAD_QUESTION_PACK } from '../actions';

const DEFAULT_STATE = {
  
};

const DUMMY_STATE = _.mapKeys([
  {
    id: 0,
    name: "CR1",
    questionCount: 4,
  },
  {
    id: 1,
    name: "CR2",
    questionCount: 5,
  },
  {
    id: 2,
    name: "CR3",
    questionCount: 7,
  },
], "id");

export default function(state = DUMMY_STATE, action) {
  switch(action.type) {
    default: return state;
  }
};