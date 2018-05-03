export const REMOVE_QUESTION = "Remove question";

export function removeQuestion(question) {
  return {
    type: REMOVE_QUESTION,
    payload: question.id
  };
}