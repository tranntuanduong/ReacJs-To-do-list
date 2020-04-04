import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : true
        }
    }

    onCloseForm = () => {
        this.setState({
            id : '',
            name : '',
            status : true
        })
        this.props.onCloseForm();
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        if(this.state.id === '') {
            this.setState({
                id : '',
                name : '',
                status : true
            });
        } 
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onClear = () => {
        this.setState({
            id : '',
            name : '',
            status : true
        });
    }

    componentDidMount(){
        if(this.props.itemEditing && this.props.itemEditing.id !== null) {
        
        } else {
            this.onClear();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps && nextProps.itemEditing) {
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
        }else if(nextProps.itemEditing === null) {
            this.setState({
                id : '',
                name : '',
                status : true
            });
        }
    }

    render() { 
        if(!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">                   
                    <h3 className="panel-title">
                        {this.state.id !== ''?'Cập nhật công việc':'Thêm Công Việc'}
                    </h3>
                    <span 
                        className="fas fa-times-circle add-job-icon"
                        onClick={this.onCloseForm}></span> 
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="name" 
                                value={this.state.name}
                                onChange={this.onChange}/>
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="btn btn-warning mr-5">
                                {this.state.id === ''?'Thêm':'Cập nhật'}
                            </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={this.onClear}>
                                Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
