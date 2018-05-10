export const CHECK_ANSWERS = 'CHECK_ANSWERS';

export function checkAnswers(answers, totalTime) {
  return {
    type: CHECK_ANSWERS,
    payload: { answers, totalTime }
  };
}