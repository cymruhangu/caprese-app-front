import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
// import { MyProjectList } from './my-project-list';
// import {fetchProjects} from '../actions/projects';
// import ProjectList from './project-list';

export class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: this.props.userProjects.filter(project => project.isActive).length,
      completed: this.props.userProjects.filter(project => !project.isActive).length
    }
  
    // this.onTimerClick = this.onTimerClick.bind(this);
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
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-username">Username: {this.props.username}</div> 
                <div className="user-stats">
                  <p>You currently have {this.state.active} active projects and {this.state.completed} completed</p>
                </div>             
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        projects: state.projects,
        userProjects: state.projects.filter(project => project.owner._id  === state.auth.currentUser.id)
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
