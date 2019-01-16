import { UPDATE_TIME, UPDATE_PROJECTID } from '../actions/timer';

const initialState = {
  currentProjectId: '',  
  budget: 30000,
  remaining: 30000,
  work: 30000,
  break: 10000
};


export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TIME:
      return Object.assign({}, state, {
        remaining: action.current
      });
    case UPDATE_PROJECTID:
      return Object.assign({}, state, {
        currentProjectId: action.id
      });
    default: 
      return state;
  }
};