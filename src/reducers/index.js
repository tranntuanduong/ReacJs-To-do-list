import {combineReducers} from 'redux';
import tasks from './Tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './ItemEditing';
import filterTable from './FilterTable';
import searchTask from './SearchTask';
import sortTask from './SortTask';
const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    itemEditing,
    filterTable,
    searchTask,
    sortTask
});

export default myReducer;