import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProjects } from '../actions/projects';
import TimerIntervals from './timer-intervals';
import './dashboard.css';

export class Dashboard extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchProjects()); 
  }

  render() {
    return (
      <div className="dashboard">
        <h3>Logged in as: </h3>
        <div className="dashboard-name">{this.props.name}</div>
        <div className="dashboard-username">Username: {this.props.username}</div>
        <div className="user-stats">
          <h3>Your Projects:</h3>
          <p> Active:  {this.props.active.length}</p>
          <p> Completed: {this.props.completed.length}</p>
        </div>
        <TimerIntervals />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    protectedData: state.protectedData.data,
    projects: state.projects,
    userProjects: state.projects.filter(project => project.owner._id === state.auth.currentUser.id),
    active: state.projects.filter(project => project.owner._id === state.auth.currentUser.id && project.isActive),
    completed: state.projects.filter(project => project.owner._id === state.auth.currentUser.id && !project.isActive)
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
