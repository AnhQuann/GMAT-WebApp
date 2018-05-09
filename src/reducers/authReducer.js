import { LOGIN, LOGOUT, CHECK_TOKEN, FETCH_USER_INFO } from '../actions';

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
            const payload = action.payload;
            if (!payload) return state;
            
            const token = payload.token;
            const role = payload.role;
            return {
                ...state,
                doneCheckToken: true,
                isLoggedIn: token != null,
                role
            };
        case LOGOUT:
            return { ...state, isLoggedIn: false, user: null };
        case FETCH_USER_INFO:
            const userInfo = action.payload;
            return { ...state, user: userInfo };
        default:
            return state;
    }
}