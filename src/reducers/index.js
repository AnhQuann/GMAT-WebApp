import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';
import currentQuestionReducer from './currentQuestionReducer';
import questionPackReducer from './questionPackReducer';
import resultReducer from './resultReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer,
    popupReducer,
    currentQuestionReducer,
    questionPackReducer,
    resultReducer
});

export default rootReducer;