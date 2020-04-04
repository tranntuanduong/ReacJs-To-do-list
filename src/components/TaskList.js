import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1, //-1, active :1, deactive : 0
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            {
                filterName: name === 'filterName' ? value : this.state.filterName,
                filterStatus: name === 'filterStatus' ? value : this.state.filterStatus
            }
        );
        this.setState({
            [name]: value
        })
    }

    render() {
        var { tasks, filterTable, searchTask, sortTask } = this.props;
        if (filterTable.filterName) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterTable.filterName.toLowerCase()) !== -1;
            });
        }

        tasks = tasks.filter((task) => {
            if (filterTable.filterStatus === -1) {
                return task;
            } else {
                return task.status === (filterTable.filterStatus === 1 ? true : false);
            }
        });
        if (searchTask) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(searchTask.keySearch.toLowerCase()) !== -1;
            });
        }

        if (sortTask) {
            if (sortTask.sortBy === 'name') {
                tasks.sort((a, b) => {
                    if (a.name > b.name) return sortTask.sortValue;
                    else if (a.name < b.name) return -sortTask.sortValue;
                    else return 0;
                })
            } else if (sortTask.sortBy === 'status') {
                tasks.sort((a, b) => {
                    if (a.status > b.status) return -sortTask.sortValue;
                    else if (a.status < b.status) return sortTask.sortValue;
                    else return 0;
                })
            }
        }

        var elementTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}>s
                    </TaskItem>
        });
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        value={this.filterName}
                                        onChange={this.onChange} />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        value={this.filterStatus}
                                        onChange={this.onChange}>
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elementTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        searchTask: state.searchTask,
        sortTask: state.sortTask
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (filter) => {
            dispatch(actions.filterTable(filter))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
