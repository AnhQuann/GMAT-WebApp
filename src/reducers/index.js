import { combineReducers } from 'redux';
import dummyReducer from './dummyReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    dummyReducer,
    authReducer
});

export default rootReducer;