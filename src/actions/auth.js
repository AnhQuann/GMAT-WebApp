import axios from 'axios';

import { SIGN_IN, AUTH } from './urls';
import { LOGIN, CHECK_TOKEN, AXIOS_CONFIGS } from '../actions';

export function login(username, password) {
    const body = { username, password };
    const request = axios.post(SIGN_IN, body, AXIOS_CONFIGS);
    
    return  {
        type: LOGIN,
        payload: request
    };
}

export function isAuth() {
    let token = document.cookie.split("; ").filter(e => {
        if (e.slice(0, e.indexOf("=")) == 'token') return true;
        else return false;
    })[0];

    if(token) {
        const body = { token: token.slice(token.indexOf("=")+1, token.length) };
        const request = axios.post(AUTH, body, AXIOS_CONFIGS);

        return  {
            type: CHECK_TOKEN,
            payload: request
        };
    }
    else return { type: CHECK_TOKEN, payload: {} }
}