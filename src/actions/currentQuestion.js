export const SELECT_QUESTION = "SELECT QUESTION";

export function selectQuestion(question, handleOK = (() => {}), actionTitle="Edit question") {
  return {
    type: SELECT_QUESTION,
    payload: { question, handleOK, actionTitle }
  };
}