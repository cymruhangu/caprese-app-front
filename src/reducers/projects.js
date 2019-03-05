import * as ACTIONS from '../actions/projects';

const projectsInitialState = [];

export default (state = projectsInitialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_PROJECTS_SUCCESS:
    //Need to check if store is empty.
      return [...state, ...action.projects];
    case ACTIONS.FETCH_ONE_PROJECT_SUCCESS:
      console.log('FETCH_ONE_PROJECT_SUCCESS');
      //replace project in store
      const newProject = state.map((project) => {
        if(project._id === action.id){
          return {
            ...project, 
            ...action.updates
          };
        } else {
          return project;
        }
      });
      return newProject;
    case ACTIONS.ADD_PROJECT_SUCCESS:
      return [...state, action.project];
    case ACTIONS.DELETE_PROJECT_SUCCESS:
      return state.filter((project) => project.id !== action.id);
    case ACTIONS.UPDATE_PROJECT_SUCCESS:
      const updatedProject = state.map((project) => {
        if(project.id === action.id){
          return {
            ...project, 
            ...action.updates
          };
        } else {
          return project;
        } 
    });
    return updatedProject;
    default:
      return state;
  }
};