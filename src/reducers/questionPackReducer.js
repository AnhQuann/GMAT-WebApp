import _ from "lodash";
import { REMOVE_QUESTION_PACK, SELECT_QUESTION_PACK, ADD_QUESTION_PACK } from '../actions';

const DUMMY_STATE = _.mapKeys([
  {
    id: 0,
    name: "CR1",
    questions: ["1", "2", "3"]
  },
  {
    id: 1,
    name: "CR2",
    questions: ["1", "2", "3", "4"]
  },
  {
    id: 2,
    name: "CR3",
    questions: ["1", "2", "3", "4", "5", "6", "7"]
  },
], "id");

export default function(state = DUMMY_STATE, action) {
  switch(action.type) {
    case REMOVE_QUESTION_PACK:
      const questionPackToDelete = action.payload;
      return _.omit(state, questionPackToDelete.id);
    case SELECT_QUESTION_PACK:
      const selectedQuestionPack =  action.payload.questionPack;
      return { ...state, 
        [selectedQuestionPack.id] : selectedQuestionPack
      };
    case ADD_QUESTION_PACK:
      const addedQuestion = action.payload;
      return {
        ...state,
        [addedQuestion.id]: addedQuestion
      };
    default: return state;
  }
};