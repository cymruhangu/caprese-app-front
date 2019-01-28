import React from 'react';
// import { Link } from 'react-router-dom';
import ms from 'pretty-ms';
import './task-list-item.css';

const TaskListItem = (props) => ({
  render() {
    return(
      <div className="list-item">
        <p className='task-name'>{props.name}{':'}</p> 
        <div className="task-info">
          <span className='label'>budget: </span>{ms(props.budget)}{' '}
          <span className='label'>remaining: </span>{ms(props.remaining)}{' '}
          <span className='label'>status: </span>{props.isActive ? 'Open' : 'Closed'}{' '}
          <span className="task-controls">
            {props.isActive ? 
              <div className="tooltip"><i className="far fa-clock" onClick={(e) => {
                e.preventDefault();
                props.onTimerClick({
                  projectId: props._id,
                  projectName: props.name, 
                  projectBudget:props.budget, 
                  projectRemaining: props.remaining,
                  work: 30000});
              }}></i>
              <span className="tooltiptext">Task timer</span>
            </div>: ''}{'  '}
            <div className="tooltip">
              <i className="far fa-edit"
                onClick={(e) => {
                  e.preventDefault();
                  props.onEditClick(props._id);
                }}
              ></i>
              <span className="tooltiptext">Edit task</span>
            </div>
            <div className="tooltip">
              <i className="far fa-trash-alt" onClick={ (e) => {
                e.preventDefault();
                props.onDeleteClick(props._id);
                }}></i>
              <span className="tooltiptext">Delete task</span>
            </div>
          </span>
        </div>      
    </div>
    )
  }    
})
    



export default TaskListItem;