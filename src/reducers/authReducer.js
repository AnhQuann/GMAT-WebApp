import { LOGIN } from '../actions';

export default (state = { isLoggedIn: false }, action) => {
    switch (action.type) {
        case LOGIN:
            //console.log(action.payload.data);
            // return { isLoggedIn: true };
            return { ...state, isLoggedIn: action.payload.data.success==1 };
        default:
            return state;
    }
}