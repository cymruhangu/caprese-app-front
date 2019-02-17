import * as ACTIONS from '../actions/tasks';

const tasksInitialState = [];

export default (state = tasksInitialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_TASKS_SUCCESS:
    //Need to check if store is empty.
      console.log('FETCH_TASK_SUCCESS');
      console.log(action.tasks);
      return [...state, ...action.tasks];
    case ACTIONS.ADD_TASK_SUCCESS:
      console.log('ADD_TASK_SUCCESS');
      console.log(action.task.id);
      return [...state, action.task];
    case ACTIONS.DELETE_TASK_SUCCESS:
      console.log('DELETE_TASK_SUCCESS');
      console.log(state);
      return state.filter((task) => task._id !== action.id);
    case ACTIONS.UPDATE_TASK_SUCCESS:
      console.log('UPDATE_TASK_SUCCESS');
      console.log(action.updates)
      return state.map((task) => {
        if(task.id === action.id){
          return {
            ...task, 
            ...action.updates
          };
        } else {
          return task;
        }
    });
    default:
      return state;
  }
};