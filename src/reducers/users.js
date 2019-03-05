import * as ACTIONS from '../actions/users';

const usersInitialState = [];

export default (state = usersInitialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_USERS_SUCCESS:
      return [...state, ...action.users];
    case ACTIONS.DELETE_USER_SUCCESS:
      return state.filter((user) => user._id !== action.id);
    case ACTIONS.UPDATE_USER_SUCCESS:
      return state.filter((project) => {
        if(project.id === action.id){
          return {
            ...project, 
            ...action.updates
          };
        } else {
          return user;
        }
    });
    default:
      return state;
  }
};