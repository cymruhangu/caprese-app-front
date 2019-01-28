import React from 'react';
import { connect } from 'react-redux';
import TaskListItem from './task-list-item';
import TaskTimer from './task-timer';
import { updateProjectData} from '../actions/timer';
import { deleteTask } from '../actions/tasks';
import './project-list.css';

export class  MyTaskList extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      userid: this.props.userid
    }
    this.onTimerClick = this.onTimerClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onTimerClick(task){
    this.props.dispatch(updateProjectData(task));
  }

  onEditClick(id){
    this.props.history.push(`/tasks/${id}`);
  }

  onDeleteClick(id) {
    this.clearTimer();
    this.props.dispatch(deleteTask(id));
    this.props.history.push(`/projects/${this.props.project._id}`);
  }

  clearTimer = () => {
    const clearObj = {
      projectId: '', 
      projectName: '', 
      projectBudget: '',
      projectRemaining: ''
    };
    this.props.dispatch(updateProjectData(clearObj));
  }

  render() {
   return (
    <div className='task-list'>
      <h1>My Tasks</h1>
      {
        this.props.tasks.map((task, index) => (
          <TaskListItem key={index}
            {...task}
            onTimerClick={this.onTimerClick}
            onDeleteClick={this.onDeleteClick}
            onEditClick={this.onEditClick}
          />))
      }
      <TaskTimer />
    </div>
    )
  }
}
  

const mapStateToProps = (state, props) => {
     return {
      tasks: state.tasks.filter(task => task.parent._id  === props.projectId),
      newTask: state.tasks.filter(task => task.owner === state.auth.currentUser.id),
      userid: state.auth.currentUser.id,
      project: state.projects.filter(project => project._id === props.projectId)
    }
};

export default connect(mapStateToProps)(MyTaskList);