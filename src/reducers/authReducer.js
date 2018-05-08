import { LOGIN, LOGOUT, CHECK_TOKEN } from '../actions';

export default (state = { isLoggedIn: false, doneCheckToken: false, errMessage: null, user: null }, action) => {
    switch (action.type) {
        case LOGIN:
            const data = action.payload.data;
            const user = data.user ? data.user : null;
            return {
                ...state,
                isLoggedIn: data.success === 1,
                errMessage: data.success !== 1 ? data.messaage : null,
                user: user,
                role: user ? user.role: null
            };
        case CHECK_TOKEN:
            if(!action.payload.data || (action.payload.data && action.payload.data.success === 0)) document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            return {
                ...state,
                doneCheckToken: true,
                isLoggedIn: action.payload.data ? action.payload.data.success === 1 : false,
                user: action.payload.data && action.payload.data.user ? action.payload.data.user : null
            };
        case LOGOUT:
            return { ...state, isLoggedIn: false, user: null };
        default:
            return state;
    }
}