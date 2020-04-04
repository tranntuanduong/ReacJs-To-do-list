import * as types from '../constants/ActionTypes'
var initalState = {
    filterName : '',
    filterStatus : -1
};

var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            return {
                filterName : action.filter.filterName,
                filterStatus : parseInt(action.filter.filterStatus, 10)
            }   

        default: return state;
    }
};

export default myReducer;