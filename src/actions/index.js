import * as types from './../constants/ActionTypes'

export const listAll = () => {
    return {
        type : types.LIST_ALL
    }
};

export const saveTask = (task) => {
    return {
        type : types.SAVE_TASK,
        task : task
    }
};

export const updateTask = (task) => {
    return {
        type : types.UPDATE_TASK,
        task : task
    }
};

export const closeForm = () => {
    return {
        type : types.CLOSE_FORM
    }
};

export const showForm = (itemEditting) => {
    return {
        type : types.SHOW_FORM,
        itemEditting : itemEditting
    }
};

export const generateData = () => {
    return {
        type : types.GENERATE_DATA
    }
};

export const changeStatus = (id) => {
    return {
        type : types.CHANGE_STATUS,
        id : id
    }
};

export const deleteTask = (id) => {
    return {
        type : types.DELETE_TASK,
        id : id
    }
};

export const clearItemEditing = () => {
    return {
        type : types.CLEAR_ITEM_EDITING
    }
};

export const filterTable = (filter) => {
    return {
        type : types.FILTER_TABLE,
        filter
    }
};

export const searchTask = (searchTask) => {
    return {
        type : types.SEARCH_TASK,
        searchTask
    }
};

export const sortTask = (sortTask) => {
    return {
        type : types.SORT_TASK,
        sortTask
    }
};