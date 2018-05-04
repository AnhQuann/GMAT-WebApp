export const REMOVE_QUESTION_PACK = 'Remove question pack';

export function removeQuestionPack(questionPack) {
  return {
    type: REMOVE_QUESTION_PACK,
    payload: questionPack
  };
}