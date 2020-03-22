import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : true,
            taskEditing : null
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

    render() {
        var {tasks, isDisplayForm, taskEditing} = this.state;
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
                        <Control></Control>
                        {/* Form */}
                        <TaskList 
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}>
                        </TaskList>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
