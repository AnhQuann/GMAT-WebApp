export const REMOVE_QUESTION_PACK = 'Remove question pack';
export const ADD_QUESTION_PACK = 'Add question pack';
export const EDIT_QUESTION_PACK = 'Edit question pack';

export function removeQuestionPack(questionPack) {
  return {
    type: REMOVE_QUESTION_PACK,
    payload: questionPack
  };
}

export function editQuestionPack(questionPack) {
  return {
    type: EDIT_QUESTION_PACK,
    payload: questionPack
  };
}

export function addQuestionPack(questionPack) {
  return {
    type: ADD_QUESTION_PACK,
    payload: { ...questionPack, id: Math.floor(Math.random() * 10 + 3) }
  };
}