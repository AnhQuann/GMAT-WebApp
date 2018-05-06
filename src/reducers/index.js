import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';
import currentQuestionReducer from './currentQuestionReducer';
import questionPackReducer from './questionPackReducer';
import currentQuestionPackReducer from './currentQuestionPackReducer';
import questionSearchResultReducer from './questionSearchResultReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer,
    popupReducer,
    currentQuestionReducer,
    questionPackReducer,
    currentQuestionPackReducer,
    questionSearchResultReducer
});

export default rootReducer;