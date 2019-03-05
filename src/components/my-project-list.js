import React from 'react';
import { connect } from 'react-redux';
import MyProjectListItem from './my-project-list-item';
import Timer2 from './timer2';
import { updateProjectData} from '../actions/timer';
import { deleteProject } from '../actions/projects';
import './project-list.css';
import { updateProject } from '../actions/projects';

export class  MyProjectList extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      userid: this.props.userid
    }
    this.onTimerClick = this.onTimerClick.bind(this);
    this.onCompleteClick = this.onCompleteClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onTimerClick(project){
    this.props.dispatch(updateProjectData(project));
  }

    onCompleteClick(id){
    const update = {
      id: id,
      isActive: false
    };
    this.props.dispatch(updateProject(id, update));
  }

  onDeleteClick(id) {
    this.clearTimer();
    this.props.dispatch(deleteProject(id));
    this.props.history.push('/my-projects');
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
      <div className='project-list'>
        <h2>My Projects and Work items:</h2>
        <div className='project-container'> 
        {
            this.props.projects.map((project, index) => (
              <MyProjectListItem key={index}
                {...project}
                onTimerClick={this.onTimerClick}
                onDeleteClick={this.onDeleteClick}
                onCompleteClick={this.onCompleteClick}
              />))
        }
        </div>
        <Timer2 />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
    return {
      projects: state.projects.filter(project => project.owner._id  === state.auth.currentUser.id),
      newProject: state.projects.filter(project => project.owner === state.auth.currentUser.id),
      userid: state.auth.currentUser.id
    }
};

export default connect(mapStateToProps)(MyProjectList);