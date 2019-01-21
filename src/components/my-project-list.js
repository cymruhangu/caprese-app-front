import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import MyProjectListItem from './my-project-list-item';
import Timer from './timer';
import { updateProjectId} from '../actions/timer';
import { deleteProject } from '../actions/projects';
import './project-list.css';
// import { fetchProjects } from '../actions/projects';

export class  MyProjectList extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      projects: this.props.projects.filter(project => project.owner._id === this.props.userid)
    }
    this.onTimerClick = this.onTimerClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onTimerClick(project){
    this.props.dispatch(updateProjectId(project));
  }

  onEditClick(id){
    this.props.history.push(`/projects/${id}`);
  }

  onDeleteClick(id) {
    this.props.dispatch(deleteProject(id));
    this.props.history.push('/');
  }
  render() {
   return (
      <div className='project-list'>
        <h1>My Projects</h1>
        {
            this.state.projects.map((project, index) => (
                <MyProjectListItem key={index}
                    {...project}
                    onTimerClick={this.onTimerClick}
                    onDeleteClick={this.onDeleteClick}
                    onEditClick={this.onEditClick}
                />))
        }
        <Timer />
      </div>
    )
  }
}
  

const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        userid: state.auth.currentUser.id
    }
};

export default connect(mapStateToProps)(MyProjectList);