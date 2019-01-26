import React from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import MyProjectListItem from './my-project-list-item';
// import Timer2 from './timer2';
import { updateProjectId} from '../actions/timer';
import { deleteProject } from '../actions/projects';
import './project-list.css';
// import { fetchProjects } from '../actions/projects';

export class  MyProjectList extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      userid: this.props.userid
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
    this.props.history.push('/my-projects');
  }
  render() {
    console.log(this.props.projects);
   return (
      <div className='project-list'>
        <h1>My Projects</h1>
        {
            this.props.projects.map((project, index) => (
                <MyProjectListItem key={index}
                    {...project}
                    onTimerClick={this.onTimerClick}
                    onDeleteClick={this.onDeleteClick}
                    onEditClick={this.onEditClick}
                />))
        }
        
      </div>
    )
  }
}
  

const mapStateToProps = (state, props) => {
  console.log(state.projects);
     return {
      projects: state.projects.filter(project => project.owner._id === state.auth.currentUser.id),
      userid: state.auth.currentUser.id
    }
};

export default connect(mapStateToProps)(MyProjectList);