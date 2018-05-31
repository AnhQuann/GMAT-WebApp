import axios from 'axios';

import { API_CLASSROOM } from '../constants';
import { checkFields } from '../utils';

export function fetchClassRooms() {
  const request = axios.get(API_CLASSROOM);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.classrooms')) {
        resolve(response.data.classrooms);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}

export function fetchClassRoom(classRoomId) {
  const request = axios.get(`${API_CLASSROOM}/${classRoomId}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.classroom')) {
        resolve(response.data.classroom);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}

export function editClassRoom(classRoom) {
  const request = axios.put(`${API_CLASSROOM}/${classRoom._id}`, classRoom);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.classroom')) {
        resolve(response.data.classroom);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}

export function deleteClassRoom(classRoomId) {
  const request = axios.delete(`${API_CLASSROOM}/${classRoomId}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.classroom')) {
        resolve(response.data.classroom);
      } else {
        reject();
      }
    });
  }
  return request.then(interceptor);
}