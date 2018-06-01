import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';
import currentQuestionReducer from './currentQuestionReducer';
import questionPackReducer from './questionPackReducer';
import currentQuestionPackReducer from './currentQuestionPackReducer';
import questionSearchResultReducer from './questionSearchResultReducer';
import resultReducer from './resultReducer';
import studentReducer from './studentReducer';
import classRoomReducer from './classRoomReducer';

const rootReducer = combineReducers({
    authReducer,
    questionReducer,
    popupReducer,
    currentQuestionReducer,
    questionPackReducer,
    currentQuestionPackReducer,
    questionSearchResultReducer,
    resultReducer,
    studentReducer,
    classRoomReducer
});

export default rootReducer;