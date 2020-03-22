import React, { Component } from 'react';
class TaskForm extends Component {
    onCloseForm = () => {
        this.props.onCloseForm();
    }

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
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

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        // this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

    componentDidMount(){
        var taskEditing = this.props.taskEditing;
        if(taskEditing) {
            this.setState({
                id : taskEditing.id,
                name : taskEditing.name,
                status : taskEditing.status
            });
            // console.log(this.state)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEditing) {
            this.setState({
                id : nextProps.taskEditing.id,
                name : nextProps.taskEditing.name,
                status : nextProps.taskEditing.status
            });
        }else if(nextProps.taskEditing === null) {
            this.setState({
                id : '',
                name : '',
                status : false
            });
        }
    }

    render() { 
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">                   
                    <h3 className="panel-title">
                        {id !== ''?'Cập nhật công việc':'Thêm Công Việc'}
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
                                {id === ''?'Thêm':'Cập nhật'}
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

export default TaskForm;
