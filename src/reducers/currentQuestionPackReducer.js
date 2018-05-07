import { SELECT_QUESTION_PACK } from '../actions';


export default function (state={}, action) {
  switch(action.type) {
    case SELECT_QUESTION_PACK:
      const payload = action.payload;
      const questionPack = payload.questionPack;
      const handleOK = payload.handleOK;
      const handleCancel = payload.handleCancel;
      const title = payload.title;
      return {
        questionPack,
        handleOK,
        handleCancel,
        title
      };
    default:
      return state;
  }
}