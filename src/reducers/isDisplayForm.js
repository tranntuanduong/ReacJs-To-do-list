import * as types from '../constants/ActionTypes'
var initalState = true;


var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.SHOW_FORM:
            return true;
        case types.CLOSE_FORM:
            return false;
        default: return state;
    }
};

export default myReducer;