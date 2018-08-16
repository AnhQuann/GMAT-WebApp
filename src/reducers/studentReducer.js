import _ from "lodash";
import { FETCH_STUDENT_LIST, ADD_STUDENT, EDIT_STUDENT, DELETE_STUDENT } from "../actions/student";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_STUDENT_LIST:
            return _.mapKeys(action.payload, "_id");
        case ADD_STUDENT:
            const addedStudent = action.payload;
            return {
                ...state,
                [addedStudent._id]: addedStudent
            };
        case EDIT_STUDENT:
            const edittedStudent = action.payload;
            return {
                ...state,
                [edittedStudent._id]: edittedStudent
            };
        case DELETE_STUDENT:
            const studentToDelete = action.payload;
            return _.omit(state, studentToDelete._id);
        default: return state;

    }   
};
