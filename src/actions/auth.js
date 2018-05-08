import axios from 'axios';

import { SIGN_IN, AUTH } from './urls';
import { AXIOS_CONFIGS } from './settings';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const GET_USER = "GET USER";

axios.defaults.config = AXIOS_CONFIGS;

export function login(username, password) {
  const body = { username, password };
  const request = axios.post(SIGN_IN, body);
  const tokenInterceptor = (response, error) => {
    return new Promise(
      (resolve, reject) => {
        if (response.data && response.data.token) {
          saveCredentials({
            token: response.data.token
          });
        }
        resolve(response);
      }
    );
  };
  return  {
      type: LOGIN,
      payload: request.then(tokenInterceptor)
  };
}

export function logout() {    
    clearCredentials();
    return  {
        type: LOGOUT,
        payload: null
    }
}

export function checkToken() {
    let token = document.cookie.split("; ").filter(e => {
        if (e.slice(0, e.indexOf("=")) === "token") return true;
        else return false;
    })[0];

    if(token) {
        const body = { token: token.slice(token.indexOf("=")+1, token.length) };
        const request = axios.post(AUTH, body);

        return  {
            type: CHECK_TOKEN,
            payload: request
        }
    }
    else return { type: CHECK_TOKEN, payload: {} }
}

function saveCredentials(token) {
  var now = new Date();
  var expirationTime = new Date(now.setDate(now.getDate() + 7)).toGMTString();
  sessionStorage.setItem("credentials", JSON.stringify({
    token, expirationTime
  }));
}

function loadCredentials() {
  const credentialsText = sessionStorage.getItem("credentials");
  return credentialsText ? JSON.parse(credentialsText): null;
}

function clearCredentials() {
  sessionStorage.removeItem("credentials");
}