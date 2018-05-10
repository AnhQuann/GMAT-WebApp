import { combineReducers } from 'redux';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';
import currentQuestionReducer from './currentQuestionReducer';
import questionPackReducer from './questionPackReducer';
<<<<<<< HEAD
import currentQuestionPackReducer from './currentQuestionPackReducer';
import questionSearchResultReducer from './questionSearchResultReducer';
=======
import resultReducer from './resultReducer';
>>>>>>> origin/student-features

const rootReducer = combineReducers({
    authReducer,
    questionReducer,
    popupReducer,
    currentQuestionReducer,
    questionPackReducer,
<<<<<<< HEAD
    currentQuestionPackReducer,
    questionSearchResultReducer
=======
    resultReducer
>>>>>>> origin/student-features
});

export default rootReducer;