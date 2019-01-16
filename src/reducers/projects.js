import * as ACTIONS from '../actions/projects';

const projectsInitialState = {
  projects: []
};

export default (state = projectsInitialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_PROJECTS_SUCCESS:
      console.log(action.projects);
      console.log(state);
      // return {
      //   projects: [action.projects, ...state.projects]
      // };
      const z =  Object.assign({}, state, { projects: [...state.projects, ...action.projects] });
      console.log(z);
      return z;
      // return Object.assign({},state, { projects: action.projects });
    case ACTIONS.ADD_PROJECT_SUCCESS:
      console.log(action.project);
      console.log(state.projects);
      return Object.assign({},state, {
        projects: [...state.projects, action.project] });
    case ACTIONS.DELETE_PROJECT:
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_PROJECT':
      return state.map((project) => {
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