import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

//REGISTER USER
export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
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

//GET USER

//UPDATE USER
export const UPDATE_USER = 'UPDATE_USER'
export const updateProject = (id, updates) => dispatch => {
  return fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(
      dispatch(updateUserSuccess(id, updates))
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

//UPDATE USER SUCCESS
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = (id, updates) => ({
  type: UPDATE_USER_SUCCESS,
  id,
  updates,
});

//DELETE USER