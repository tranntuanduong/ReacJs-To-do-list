import * as types from '../constants/ActionTypes'
var initalState = {
    sortValue : 1,
    sortBy : 'name'
};

var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            return action.sortTask;    

        default: return state;
    }
};

export default myReducer;