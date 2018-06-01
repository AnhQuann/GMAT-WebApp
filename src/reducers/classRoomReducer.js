import _ from 'lodash';
import { FETCH_CLASSROOM_LIST, FETCH_CLASSROOM, EDIT_CLASSROOM, DELETE_CLASSROOM } from "actions/classRoom";

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_CLASSROOM_LIST:
            return _.mapKeys(action.payload, "_id");
        case EDIT_CLASSROOM:
            const editedClassRoom = action.payload;
            return {
                ...state,
                [editedClassRoom._id]: editedClassRoom
            };
        case DELETE_CLASSROOM:
            const classRoomToDelete = action.payload;
            return _.omit(state, classRoomToDelete._id);
        default: return state;
    }

};