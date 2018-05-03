import {LOAD_CURRENT_QUESTION} from '../actions/currentQuestion';

export default function(state = [], action) {
    switch (action.type) {
        case LOAD_CURRENT_QUESTION: return action.payload;
        default: return state;
    }
}