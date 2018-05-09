export const ROUTER_STUDENT = "";

export const ROUTER_PACK = `${ROUTER_STUDENT}/pack`;
export const ROUTER_PACK_PARAM_ID = `${ROUTER_PACK}/:id`;

export const ROUTER_RESULT = "/result";
export const ROUTER_RESULT_PARAM_ID = `${ROUTER_RESULT}/:id`;

export const ROUTER_LECTURER = "/lecturer";

export const ROUTER_QUESTION_PACK = `${ROUTER_LECTURER}/question-pack`;
export const ROUTER_QUESTION_PACK_EDIT_OR_ADD = `${ROUTER_QUESTION_PACK}/(edit|add)`;
export const ROUTER_QUESTION_PACK_EDIT = `${ROUTER_QUESTION_PACK}/edit`;

export const ROUTER_QUESTION = `${ROUTER_LECTURER}/question`;
export const ROUTER_QUESTION_EDIT_OR_ADD = `${ROUTER_QUESTION}/(edit|add)`;

export const API_URL = `https://gmat-api.herokuapp.com/api`;
// export const API_URL = 'http://localhost:6996';
export const SIGN_IN_URL = `${API_URL}/signin`;