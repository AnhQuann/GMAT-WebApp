import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';
import currentQuestionReducer from './currentQuestionReducer';
import questionPackReducer from './questionPackReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer,
    popupReducer,
    currentQuestionReducer,
    questionPackReducer
});

export default rootReducer;