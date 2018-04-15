import { LOGIN, LOGOUT, CHECK_TOKEN } from '../actions';

export default (state = { isLoggedIn: false, doneCheckToken: false, errMessage: null, user: null }, action) => {
    switch (action.type) {
        case LOGIN:
            var now = new Date();
            var nowGMT = new Date(now.setDate(now.getDate() + 7)).toGMTString();
            document.cookie = action.payload.data ? `token=${action.payload.data.token}; expires=${nowGMT}; path=/` : '';
            return {
                ...state,
                isLoggedIn: action.payload.data.success === 1,
                errMessage: action.payload.data.success === 0 ? action.payload.data.messaage : null,
                user: action.payload.data && action.payload.data.user ? action.payload.data.user : null
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