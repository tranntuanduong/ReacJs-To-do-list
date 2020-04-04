import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onGenerateData = () => {
        this.props.onGenerateData();
    }

    onShowForm = () => {
        this.props.onShowForm();
        this.props.onClearItemEditing();
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
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lí công việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={this.props.isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                        {/* Form */}
                        
                        <TaskForm
                            itemEditing={this.state.itemEditing}>
                        </TaskForm>
                    </div>
                    <div className={this.props.isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                                                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                            type="button" 
                            className="btn btn-primary  mr-5"
                            onClick={this.onShowForm}>
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
                            // onSearch={this.onSearch}
                            // onSort={this.onSort}
                            // sortBy={sortBy}
                            // sortValue={sortValue}
                            >
                        </TaskControl>
                        {/* Form */}
                        <TaskList 
                            // onFilter={this.onFilter}
                            // itemEditing={this.state.itemEditing}
                            // onUpdate={this.onUpdate}
                            >
                        </TaskList>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        tasks : state.tasks,
        itemEditing : state.itemEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowForm : () => {
            dispatch(actions.showForm())
        },
        onGenerateData : () => {
            dispatch(actions.generateData())
        },
        onClearItemEditing : () => {
            dispatch(actions.clearItemEditing())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
