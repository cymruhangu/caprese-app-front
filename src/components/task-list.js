import React from 'react';
import { connect } from 'react-redux';
// import TaskListItem from './task-list-item';
import './project-list.css';

export class  TaskList extends React.Component { 
  
  render() {
    console.log(this.props.tasks);
    return (
      <div className="project-list">
        <h1>All Tasks</h1>
       
      </div>
    )
  }
}
  

const mapStateToProps = (state) => {
  console.log(state.tasks);
    return {
        tasks: state.tasks
    }
};

export default connect(mapStateToProps)(TaskList);