import { SELECT_QUESTION } from '../actions';

const DEFEAULT_STATE = {
  question: {
    stimulus: "",
    stem: "",
    choices: ["", "", "", "", ""],
    rightChoice: 0,
    difficulty: 0,
    explanation: "",
  },
  handleOK: (question) => {}
};

export default function(state = DEFEAULT_STATE, action) {
  switch(action.type) {
    case SELECT_QUESTION:
      const question = action.payload.question ? action.payload.question : DEFEAULT_STATE.question;
      return {
        question,
        handleOK: action.payload.handleOK,
        actionTitle: action.payload.actionTitle
      };
    default: return state;
  }
};