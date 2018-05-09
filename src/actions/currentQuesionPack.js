import _ from 'lodash';
import axios from 'axios';

import { API_QUESTION_PACKS } from './urls';

export const SELECT_QUESTION_PACK = "Select question pack";

export function selectQuestionPack(questionPack={}, handleOK, handleCancel, title="Edit question") {
  if(questionPack == null) {
    return {
      type: SELECT_QUESTION_PACK,
      payload: {
        questionPack: null,
        handleCancel, handleOK, title
      }
    };
  }
  else {
    const request = axios.get(`${API_QUESTION_PACKS}/${questionPack._id}`);
    const interceptor = (response) => {
      return new Promise((resolve, reject) => {
        if(_.get(response, "data.questionPack")) {
          resolve({
            questionPack: response.data.questionPack,
            handleCancel, handleOK, title
          });
        } else {
          reject();
        }
      });
    };
    return {
      type: SELECT_QUESTION_PACK,
      payload: request.then(interceptor)
    };
  }
}