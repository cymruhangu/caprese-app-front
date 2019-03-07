import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchProjects } from '../actions/projects';
import TimerIntervals from './timer-intervals';
import './dashboard.css';

export class Dashboard extends React.Component {
  
  componentWillMount() {
    if(this.props.projects.length === 0 ){
      this.props.dispatch(fetchProjects()); 
    }else{
      console.log('already got projects from DB');
    }
    
  }

  render() {
    return (
      <section className="dashboard">
        <h3>Logged in as: </h3>
        <div className="dashboard-name">{this.props.name}</div>
        <div className="dashboard-username">Username: {this.props.username}</div>
        <div className="user-stats">
          <h4>Your Projects:</h4>
          <p> Active:  {this.props.active.length}</p>
          <p> Completed: {this.props.completed.length}</p>
        </div>
        <TimerIntervals />
        <hr></hr>
        <div className="options">
          <h4>You can then select a project to work on from <Link to="/projects" >My Projects</Link></h4>
          <h4>A new project can be created from a <Link to="/projects" >Project Templates</Link></h4>
          <h4>Or create custom project from the <Link to="/projectcreate" >Create Project</Link></h4>
        </div>
      </section>
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
