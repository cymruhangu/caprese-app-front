import React from 'react';
import { connect } from 'react-redux';
import ProjectListItem from './project-list-item';
import './project-list.css';

export class  ProjectList extends React.Component { 
  render() {
    console.log(this.props.projects);
    return (
      <div className="project-list">
        <h2>Project Templates</h2>
        <div className="project-container">
        {
            this.props.projects.map((project, index) => (
                <ProjectListItem key={index}
                    {...project}
                    user={this.props.user}
                />))
        }
        </div>
        
      </div>
    )
  }
}
  

const mapStateToProps = (state) => {
    return {
      projects: state.projects.filter(project => project.owner._id  !== state.auth.currentUser.id),
      user: state.auth.currentUser
    }
};

export default connect(mapStateToProps)(ProjectList);

