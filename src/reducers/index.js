import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';
import popupReducer from './popupReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer,
    popupReducer
});

export default rootReducer;