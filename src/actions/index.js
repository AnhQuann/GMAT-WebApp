export const INCREASE_DUMMY_NUMBER = 'INCREASE DUMMY NUMBER';
export const LOGIN = 'LOGIN';

export function increaseDummyNumber() {
    return {
        type: INCREASE_DUMMY_NUMBER,
        payload: null
    };
};

export { login } from './login';