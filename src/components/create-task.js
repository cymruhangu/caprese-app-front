import React from 'react';
import { connect } from 'react-redux';
import { addTask } from  '../actions/tasks';
import TaskForm from './task-form';

const CreateTask = (props) => (
    <div>
        <h2>Create a New Task</h2>
        <TaskForm  
            onSubmit={(task) => {
                props.dispatch(addTask(task));
                props.history.push('/my-projects');
            }}
        />
    </div>

);


export default connect()(CreateTask);