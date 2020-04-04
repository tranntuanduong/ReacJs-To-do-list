import * as types from '../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initalState = data ? data : [];

var myReducer = (state = initalState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            saveTask(state, action.task);
            return [...state];

        case types.GENERATE_DATA:
            state = generateData(state);
            return [...state];

        case types.CHANGE_STATUS:
            onUpdateStatus(state, action.id);
            return [...state];

        case types.DELETE_TASK:
            onDelete(state, action.id);
            return [...state];

        default: return state;
    }
};

var saveTask = (tasks, newTask) => {
    if(newTask.id !== '') {
        var index = findIndex(tasks, newTask.id);
        tasks[index] = newTask;
    } else {
        newTask = {
            id : randomId(),
            name : newTask.name,
            status : newTask.status
        }
        tasks.push(newTask);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

var generateData = (tasks) => {
    var newTasks = [
        {
            id : randomId(),
            name : 'Hoc lap trinhhh',
            status : false
        }, {
            id : randomId(),
            name : 'Giat quan ao',
            status : true
        }, {
            id : randomId(),
            name : 'An com',
            status : true
        }, {
            id : randomId(),
            name : 'Di ngu',
            status : false
        }
    ];
    tasks = newTasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return tasks;
}

var s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}

var randomId = () => {
    return s4() + s4() + '-' + s4() 
    + '-' + s4() + s4() + '-' + s4();
}

var onUpdateStatus = (tasks, id) => {
    var index = findIndex(tasks, id);
    if(index !== -1) {
        // tasks[index].status = !tasks[index].status;
        tasks[index] = {
            ...tasks[index],
            status : !tasks[index].status
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

var findIndex = (tasks ,id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id) {
            result = index;
        }
    });
    return result;
}

var onDelete = (tasks, id) => {
    var index = findIndex(tasks, id);
    if(index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
export default myReducer;