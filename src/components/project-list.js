import React from 'react';
import { connect } from 'react-redux';
import ProjectListItem from './project-list-item';
import './project-list.css';

export class  ProjectList extends React.Component { 
  
  render() {
    console.log(this.props.projects);
    return (
      <div className="project-list">
        <h1>All Projects</h1>
        {
            this.props.projects.map((project, index) => (
                <ProjectListItem key={index}
                    {...project}
                />))
        }
      </div>
    )
  }
}
  

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
};

export default connect(mapStateToProps)(ProjectList);

