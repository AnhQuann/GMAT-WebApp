export const ROUTER_STUDENT = "/student";


export const ROUTER_LECTURER = "/lecturer";

export const ROUTER_QUESTION_PACK = `${ROUTER_LECTURER}/question-pack`;
export const ROUTER_QUESTION_PACK_EDIT_OR_ADD = `${ROUTER_QUESTION_PACK}/(edit|add)`;
export const ROUTER_QUESTION_PACK_EDIT = `${ROUTER_QUESTION_PACK}/edit`;

export const ROUTER_QUESTION = `${ROUTER_LECTURER}/question`;
export const ROUTER_QUESTION_EDIT_OR_ADD = `${ROUTER_QUESTION}/(edit|add)`;

export const API_URL = `https://gmat-api.herokuapp.com/api`;
export const SIGN_IN_URL = `${API_URL}/signin`;