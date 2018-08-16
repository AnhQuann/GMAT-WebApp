import { fetchStudents as fetchStudentsPromise } from 'networks'
import { fetchStudent as fetchStudentPromise } from 'networks'
import { addStudent as addStudentPromise } from 'networks'
import { editStudent as editStudentPromise } from 'networks'
import { deleteStudent as deleteSudentsPromise } from 'networks'


export const FETCH_STUDENT_LIST = "fetch student list";
export const FETCH_STUDENT = "fetch student";
export const ADD_STUDENT = "add student";
export const EDIT_STUDENT = "edit student";
export const DELETE_STUDENT = "delete student";

export function fetchStudents(name = "") {
    return {
        type: FETCH_STUDENT_LIST,
        payload: fetchStudentsPromise(name)
    };
}

export function fetchStudent(studentId) {
    return {
        type: FETCH_STUDENT,
        payload: fetchStudentPromise(studentId)
    };
}

export function addStudent(student) {
    return {
        type: ADD_STUDENT,
        payload: addStudentPromise(student)
    };
}

export function editStudent(student) {
    return {
        type: EDIT_STUDENT,
        payload: editStudentPromise(student)
    };
}

export function deleteStudent(student) {
    return {
        type: DELETE_STUDENT,
        payload: deleteSudentsPromise(student)
    };
}