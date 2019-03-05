import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';


//Fetch Projects
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const fetchProjectsSuccess = projects => ({
  type: FETCH_PROJECTS_SUCCESS,
  projects,
});

export const fetchProjects = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/projects`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
})
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then((data) => {
    dispatch(fetchProjectsSuccess(data))
  })
  .catch(err => {
    console.log(err);
  });
};

//FETCH ONE PROJECT
export const FETCH_ONE_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const fetchOneProjectsSuccess = project => ({
  type: FETCH_ONE_PROJECT_SUCCESS,
  project,
});
export const fetchOneProject = (id) => dispatch => {
  fetch(`${API_BASE_URL}/projects/${id}`).then(res => {
      if (!res.ok) {
          return Promise.reject(res.statusText);
      }
      return res.json();
  }).then(project => {
    dispatch(fetchOneProjectsSuccess(project));
  });
};

//ADD PROJECT
export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const addProjectSuccess = project => ({
  type: ADD_PROJECT_SUCCESS,
  project,
});
//POST Project
export const ADD_PROJECT = 'ADD_PROJECT';
export const addProject = project => dispatch => {
  return fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(project)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(newProject => {
    dispatch(addProjectSuccess(newProject));
    dispatch(fetchOneProject(newProject.id));
  })
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

//UPDATE PROJECT SUCCESS
export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS';
export const updateProjectSuccess = (id, updates) => ({
  type: UPDATE_PROJECT_SUCCESS,
  id,
  updates,
});

//UPDATE PROJECT
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const updateProject = (id, updates) => dispatch => {
  return fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(
      dispatch(updateProjectSuccess(id, updates))
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

//DELETE Project
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const deleteProjectSuccess = (id) => ({
  type: DELETE_PROJECT_SUCCESS,
  id
});

export const DELETE_PROJECT = 'DELETE_PROJECT'
export const deleteProject = (id) => (dispatch, getState) => {
   const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(
      dispatch(deleteProjectSuccess(id))
    )
    .catch(err => {
      const {reason, message, location} = err;
      if (reason === 'ValidationError') {
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};
