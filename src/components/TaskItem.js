import React, { Component } from 'react';
import * as actions from './../actions/index';
import {connect} from 'react-redux';
class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onChangeStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onShowForm();
        // this.props.onUpdate(this.props.task);
        this.props.onUpdate(this.props.task)
    }

    render() {
        var {task, index} = this.props;
        return (
            <tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {task.name}
                </td>
                <td className="text-center">
                    <span 
                        className={task.status === true ? 'label label-success status' 
                                                        : 'label label-danger status'}
                        onDoubleClick={this.onUpdateStatus}>
                        {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                         type="button" 
                         className="btn btn-warning"
                         onClick={this.onUpdate}>
                        <span className="fas fa-pencil-alt mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onDoubleClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onChangeStatus : (id) => {
            dispatch(actions.changeStatus(id))
        },
        onDelete : (id) => {
            dispatch(actions.deleteTask(id))
        },
        onUpdate : (task) => {
            dispatch(actions.updateTask(task))
        },
        onShowForm : () => {
            dispatch(actions.showForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
