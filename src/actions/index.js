export const INCREASE_DUMMY_NUMBER = 'INCREASE DUMMY NUMBER';
export const LOGIN = 'LOGIN';
export const CHECK_TOKEN = 'CHECK_TOKEN';

export const AXIOS_CONFIGS = {
    validateStatus: function (status) {
        return status < 500;
    }
};

export function increaseDummyNumber() {
    return {
        type: INCREASE_DUMMY_NUMBER,
        payload: null
    };
};

export { isAuth, login } from './auth';