import * as ACTIONS from '../actions/projects';

const projectsInitialState = [];

export default (state = projectsInitialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_PROJECTS_SUCCESS:
    //Need to check if store is empty.
      console.log('FETCH_SUCCESS');
      console.log(state);
      return [...state, ...action.projects];
    case ACTIONS.ADD_PROJECT_SUCCESS:
      console.log('ADD_SUCCESS');
      console.log(state);
      return [...state, action.project];
    case ACTIONS.DELETE_PROJECT_SUCCESS:
      console.log('DELETE_SUCCESS');
      console.log(state);
      return state.filter((project) => project._id !== action.id);
    case ACTIONS.UPDATE_PROJECT_SUCCESS:
      console.log('UPDATE_SUCCESS');
      console.log(action.updates)
      return state.filter((project) => {
        if(project.id === action.id){
          return {
            ...project, 
            ...action.updates
          };
        } else {
          return project;
        }
    });
    default:
      return state;
  }
};