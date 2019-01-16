import React from 'react';
import { connect } from 'react-redux';

import ProjectListItem from './project-list-item';

export class  ProjectList extends React.Component { 
  
  render() {
    console.log(this.props.test);
    console.log(this.props.test2);
    console.log(this.props.projects);
    this.props.projects.forEach(function(project){
      console.log(project._id);
    });
  
    return (
      <div>
        <h1>ProjectList</h1>
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
        projects: state.projects.projects[0],
        test: state.projects.projects,
        test2: state
    }
};

export default connect(mapStateToProps)(ProjectList);

