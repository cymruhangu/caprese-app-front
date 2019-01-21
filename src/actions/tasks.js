import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const fetchTasksSuccess = tasks => ({
  type: FETCH_TASKS_SUCCESS,
  tasks,
});

//Fetch Tasks
export const fetchTasks = () => dispatch => {
  fetch(`${API_BASE_URL}/tasks`).then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }
      return res.json();
  }).then(tasks => {
    // console.log(tasks);
    dispatch(fetchTasksSuccess(tasks));
  });
};

export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const addTaskSuccess = task => ({
  type: ADD_TASK_SUCCESS,
  task,
});
//POST Task
export const ADD_TASK = 'ADD_TASK';
export const addTask = task => dispatch => {
  return fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(
      dispatch(addTaskSuccess(task))
    )
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};


//UPDATE TASK SUCCESS
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const updateTaskSuccess = (id, updates) => ({
  type: UPDATE_TASK_SUCCESS,
  id,
  updates,
});

//UPDATE TASK
export const UPDATE_TASK = 'UPDATE_TASK'
export const updateTask = (id, updates) => dispatch => {
  console.log(id);
  console.log(updates);
  return fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(
      dispatch(updateTaskSuccess(id, updates))
    )
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

//DELETE Task
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  id
});

export const DELETE_TASK = 'DELETE_TASK'
export const deleteTask = (id) => dispatch => {
  return fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
        'content-type': 'application/json'
    }
  })
    // .then(res => normalizeResponseErrors(res))
    // .then(res => res.json())
    .then(
      dispatch(deleteTaskSuccess(id))
    )
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};