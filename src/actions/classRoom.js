import { fetchClassRooms as fetchClassRoomsPromise } from 'networks';
import { fetchClassRoom as fetchClassRoomPromise } from 'networks';
import { editClassRoom as editClassRoomPromise } from 'networks';
import { deleteClassRoom as deleteClassRoomPromise } from 'networks';


export const FETCH_CLASSROOM_LIST = "fetch classroom list";
export const FETCH_CLASSROOM = "fetch classroom";
export const EDIT_CLASSROOM = "edit classroom";
export const DELETE_CLASSROOM = "delete classroom";



export function fetchClassRooms() {
    return {
        type: FETCH_CLASSROOM_LIST,
        payload: fetchClassRoomsPromise()
    };
}

export function fetchClassRoom(classRoomId) {
     return {
        type: FETCH_CLASSROOM,
        payload: fetchClassRoomPromise(classRoomId)
    };
}

export function editClassRoom(classRoom) {
     return {
        type: EDIT_CLASSROOM,
        payload: editClassRoomPromise(classRoom)
    };
}

export function deleteClassRoom(classRoomId) {
     return {
        type: DELETE_CLASSROOM,
        payload: deleteClassRoomPromise(classRoomId)
    };
}