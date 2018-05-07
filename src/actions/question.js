export const REMOVE_QUESTION = "Remove question";
export const EDIT_QUESTION = "Edit question";
export const ADD_QUESTION = "Add question";

export function removeQuestion(question) {
  return {
    type: REMOVE_QUESTION,
    payload: question.id
  };
}

export function editQuestion(question) {
  return {
    type: EDIT_QUESTION,
    payload: question
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    payload: question
  };
}
