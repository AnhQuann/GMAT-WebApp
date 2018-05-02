import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer,
    questionReducer
});

export default rootReducer;