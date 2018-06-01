import axios from 'axios';
import { checkFields  } from 'utils';
import { API_STUDENT } from 'statics';

export function fetchStudents(name="") {
  const request = axios.get(`${API_STUDENT}?name=${name}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.students')) {
        resolve(response.data.students);
      } else {
        reject();
      }
    })
  }

  return request.then(interceptor);
}

export function fetchStudent(studentId) {
  const request = axios.get(`${API_STUDENT}/${studentId}`);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.foundStudent')) {
        resolve(response.data.foundStudent);
      } else {
        reject();
      }
    })
  }
  return request.then(interceptor);
} 

export function addStudent(student) {
  const request = axios.post(API_STUDENT, student);
  
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.addedStudent')) {
        resolve(response.data.addedStudent);
      } else {
        reject();
      }
    })
  };

  return request.then(interceptor);
}

export function editStudent(student) {
  const request = axios.put(`${API_STUDENT}/${student._id}`, student);
  const interceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.student')) {
        resolve(response.data.student);
      } else {
        reject();
      }
    })
  }
  return request.then(interceptor);
}

export function deleteStudent(student) {
  const request = axios.delete(`${API_STUDENT}/${student._id}`);
  const inteceptor = (response) => {
    return new Promise((resolve, reject) => {
      if(checkFields(response, 'data.success', 'data.studentBefore')) {
        resolve(response.data.studentBefore);
      } else {
        reject();
      }
    })
  }
  return request.then(inteceptor);
}