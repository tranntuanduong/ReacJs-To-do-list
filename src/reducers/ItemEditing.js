import * as types from '../constants/ActionTypes'
var initalState = {
    id : '',
    name : '',
    status : false
};

var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.UPDATE_TASK:
            // console.log(action)
            return action.task;

        case types.CLEAR_ITEM_EDITING:
            console.log('test')
            state = null;
            return state;

        default: return state;
    }
};

export default myReducer;