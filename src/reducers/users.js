import * as ACTIONS from '../actions/users';

const usersInitialState = [];

export default (state = usersInitialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_USERS_SUCCESS:
    //Need to check if store is empty.
      console.log('FETCH_SUCCESS');
      console.log(state);
      return [...state, ...action.users];
    case ACTIONS.DELETE_USER_SUCCESS:
      console.log('DELETE_SUCCESS');
      console.log(state);
      return state.filter((user) => user._id !== action.id);
    case ACTIONS.UPDATE_USER_SUCCESS:
      console.log('UPDATE_SUCCESS');
      console.log(action.updates)
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