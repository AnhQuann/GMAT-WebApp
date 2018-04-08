import axios from 'axios';

import { SIGN_IN } from './urls';
import { LOGIN } from '../actions';

export function login(username, password) {
    const body = { username, password };
    const request = axios.post(SIGN_IN, body);
    
    return  {
        type: LOGIN,
        payload: request
    };
}