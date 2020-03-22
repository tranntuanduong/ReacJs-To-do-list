import React, { Component } from 'react';
class TaskSortControl extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-down ml-5"></span> 
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <div role="button" className="sort_selected">
                                <span className="fas fa-sort-alpha-down pr-5 ml-5">
                                    Tên A-Z
                                </span>
                                <i className={
                                    (this.props.sortBy === 'name' && this.props.sortValue === 1)
                                                    ?"fas fa-check ml-10":""}>
                                </i>
                            </div>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <div role="button">
                                <span className="fas fa-sort-alpha-down-alt pr-5 ml-5">
                                    Tên Z-A
                                    <i className={
                                        (this.props.sortBy === 'name' && this.props.sortValue === -1) 
                                                    ?"fas fa-check ml-10":""}> 
                                    </i>
                                </span>
                            </div>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}>
                            <div role="button" className="ml-5">
                                Trạng Thái Kích Hoạt
                                <i className={
                                    (this.props.sortBy === 'status' && this.props.sortValue === 1) 
                                                ?"fas fa-check ml-10":""}> 
                                </i>
                            </div>
                        </li>
                        <li  onClick={() => this.onClick('status', -1)}>
                            <div role="button" className="ml-5">
                                Trạng Thái Ẩn
                                <i className={
                                    (this.props.sortBy === 'status' && this.props.sortValue === -1)
                                            ?"fas fa-check ml-10":""}>
                                </i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>  
        );
    }
}

export default TaskSortControl;
