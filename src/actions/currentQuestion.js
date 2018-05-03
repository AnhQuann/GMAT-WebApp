export const LOAD_CURRENT_QUESTION = "load_current_question";

export function loadCurrentQuestion(question) {
    return {
        type: LOAD_CURRENT_QUESTION,
        payload: question
    }
}