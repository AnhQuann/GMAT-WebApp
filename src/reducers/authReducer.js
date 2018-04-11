import { LOGIN, CHECK_TOKEN } from '../actions';

export default (state = { isLoggedIn: false, isAuth: false, errMessage: null }, action) => {
    switch (action.type) {
        case LOGIN:
            var now = new Date();
            var nowGMT = new Date(now.setDate(now.getDate() + 7)).toGMTString();
            document.cookie = action.payload.data ? `token=${action.payload.data.token}; expires=${nowGMT}; path=/` : '';
            return {
                ...state,
                isLoggedIn: action.payload.data.success == 1,
                errMessage: action.payload.data.success == 0 ? action.payload.data.messaage : null
            };
        case CHECK_TOKEN:
            return { ...state, isAuth: true, isLoggedIn: action.payload.data ? action.payload.data.success == 1 : false };
        default:
            return state;
    }
}