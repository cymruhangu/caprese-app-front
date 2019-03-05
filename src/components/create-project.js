import React from 'react';
import { connect } from 'react-redux';
import { addProject } from  '../actions/projects';
import ProjectForm from './project-form';

const CreateProject = (props) => (
    <div>
        <h2>Create a New Project</h2>
        <ProjectForm  
            onSubmit={(project) => {
              props.dispatch(addProject(project));
              props.history.push('/my-projects');
            }}
        />
    </div>
);

export default connect()(CreateProject);