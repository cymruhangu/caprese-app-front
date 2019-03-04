import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProtectedData } from '../actions/protected-data';
import TimerIntervals from './timer-intervals';
// import { MyProjectList } from './my-project-list';
// import {fetchProjects} from '../actions/projects';
// import ProjectList from './project-list';
import './dashboard.css';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.userProjects.filter(project => project.isActive).length,
      completed: this.props.userProjects.filter(project => !project.isActive).length
    }

  }
  componentWillMount() {
    this.props.dispatch(fetchProtectedData()); //What should be done here? Maybe all fetching?  
  }


  render() {
    console.log(`number projects is ${this.props.userProjects.length}`);
    console.log(this.props.userProjects);
    return (
      <div className="dashboard">
        <h3>Logged in as: </h3>
        <div className="dashboard-name">{this.props.name}</div>
        <div className="dashboard-username">Username: {this.props.username}</div>
        <div className="user-stats">
          <h3>Your Projects:</h3>
          <p> Active:  {this.state.active}</p>
          <p> Completed: {this.state.completed}</p>
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
    userProjects: state.projects.filter(project => project.owner._id === state.auth.currentUser.id)
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
