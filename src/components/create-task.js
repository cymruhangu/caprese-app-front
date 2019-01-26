import React from 'react';
import { connect } from 'react-redux';
import { addTask } from  '../actions/tasks';
import TaskForm from './task-form';

const CreateTask = (props) => (
    <div>
        <h2>Create a New Task</h2>
        <TaskForm  
            projectId={props.projectId}
            onSubmit={(task) => {
                props.dispatch(addTask(task));
                this.props.history.push('/my-projects');
            }}
        />
    </div>

);


export default connect()(CreateTask);