export const SELECT_QUESTION = "SELECT QUESTION";

export function selectQuestion(question) {
  return {
    type: SELECT_QUESTION,
    payload: question
  };
}