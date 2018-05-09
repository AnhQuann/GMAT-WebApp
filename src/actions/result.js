import _ from 'lodash';
import axios from 'axios';

import { API_RESULT } from './urls';

export const CHECK_ANSWERS = 'CHECK_ANSWERS';
export const FETCH_RESULT = 'FETCH_RESULT';

export function checkAnswers(result) {
  const request = axios.post(API_RESULT, result);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response, 'data.success') && _.get(response, 'data.result')) {
        resolve(response.data.result);
      }
      else {
        reject();
      }
    });
  }
  return {
    type: CHECK_ANSWERS,
    payload: request.then(interceptor)
  };
}

export function fetchResult(resultId) {
  const request = axios.get(`${API_RESULT}/${resultId}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(_.get(response,'data.success') && _.get(response,'data.result')) {
        console.log(response.data.result)
        resolve(response.data.result);
      } else {
        reject();
      }
    });
  };
  return {
    type: FETCH_RESULT,
    payload: request.then(interceptor)
  }
}