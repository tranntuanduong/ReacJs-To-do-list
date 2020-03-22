import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : true,
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sortBy : 'name',
            sortValue : 1
        }
    }

    componentDidMount() {
        if(localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            });
        }
    }

    onGenerateData = () => {
        var tasks = [
            {
                id : this.genareteId(),
                name : 'Hoc lap trinh',
                status : false
            }, {
                id : this.genareteId(),
                name : 'Giat quan ao',
                status : true
            }, {
                id : this.genareteId(),
                name : 'An com',
                status : true
            }, {
                id : this.genareteId(),
                name : 'Di ngu',
                status : false
            }
        ];
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    genareteId() {
        return this.s4() + this.s4() + '-' + this.s4() 
        + '-' + this.s4() + this.s4() + '-' + this.s4();
    }

    onToggleForm = () => {
        if(this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm : true,
                taskEditing : null
            });
        }else {
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing : null
            });
        }
        
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        });
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id === '') {
            data.id = this.genareteId();
            tasks.push(data);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }   
        this.setState({
            tasks : tasks,
            taskEditing : data
        });
       
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex(id) {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        });
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword
        }); 
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }
    render() {
        var {
            tasks, 
            isDisplayForm, 
            taskEditing, 
            filter,
            keyword, 
            sortBy, 
            sortValue
        } = this.state;
        //filter name before
        if(filter) {
            if(filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1) {
                    return task;
                }else {
                    return task.status === (filter.status === 1 ? true : false);
                }  
            });    
        }
        if(keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            }); 
        }
        if(sortBy === 'name') {
            tasks.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        } else if(sortBy === 'status') {
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return +sortValue;
                else return 0;
            });
        }
       
        var elementTaskForm = isDisplayForm ? 
            <TaskForm 
                onCloseForm={this.onCloseForm}
                onSubmit={this.onSubmit}
                taskEditing={taskEditing}>
            </TaskForm> 
            : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lí công việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {/* Form */}
                        {elementTaskForm}
                    </div>
                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                                                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                            type="button" 
                            className="btn btn-primary  mr-5"
                            onClick={this.onToggleForm}>
                            <span className="fa fa-plus"></span>
                            Thêm Công Việc
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.onGenerateData}>
                            Generate Data
                        </button>
                        {/* Search - Sort */}
                        <TaskControl 
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}>
                        </TaskControl>
                        {/* Form */}
                        <TaskList 
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}>
                        </TaskList>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
