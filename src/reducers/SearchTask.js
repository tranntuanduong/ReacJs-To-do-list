import * as types from '../constants/ActionTypes'
var initalState = {
    keySearch : ''
};

var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.SEARCH_TASK:
            return action.searchTask;

        default: return state;
    }
};

export default myReducer;