import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import currentQuestionReducer from './currentQuestionReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer,
    currentQuestionReducer
});

export default rootReducer;