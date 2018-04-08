import { INCREASE_DUMMY_NUMBER } from '../actions';

export default (state = { n: 0 }, action) => { 
    switch(action.type) {
        case INCREASE_DUMMY_NUMBER:
            return { n: state.n + 1 };
        default:
            return state;
    }
}