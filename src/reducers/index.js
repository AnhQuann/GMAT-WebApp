import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';
import currentQuestionReducer from './currentQuestionReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer,
    popupReducer,
    currentQuestionReducer
});

export default rootReducer;