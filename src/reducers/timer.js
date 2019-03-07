import { UPDATE_TIME, UPDATE_PROJECT_DATA, UPDATE_PROJECT_NAME} from '../actions/timer';

const initialState = {
  projectId: '', 
  projectName: '', 
  projectBudget: '',
  projectRemaining: '',
  budget: 30000,
  remaining: 30000,
  work: 10000,
  break: 5000
};


export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_TIME:
      return Object.assign({}, state, {
        remaining: action.current
      });
    case UPDATE_PROJECT_DATA:
      return Object.assign({}, state, {
        ...state,
        ...action.updates
      });
    case UPDATE_PROJECT_NAME:
      return Object.assign({}, state, {
        currentProjectName: action.name
      });
    default: 
      return state;
  }
};