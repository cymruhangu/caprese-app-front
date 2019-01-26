import React from 'react';
// import { Link } from 'react-router-dom';
import { deleteProject } from '../actions/projects';
import ms from 'pretty-ms';
import './project-list-item.css';

const MyProjectListItem = ({_id, name, budget, owner, remaining, isActive, onTimerClick}) => (
    <div className="list-item">
      <p>
        <span className='project-name'>{name}{' - '}</span> 
        <span className='label'>budget: </span>{ms(budget)}{' '}
        <span className='label'>remaining: </span>{ms(remaining)}{' '}
        <span className='label'>status: </span>{isActive ? 'Open' : 'Closed'}{' '}
        <span className="project-controls">
          {isActive ? 
            <div className="tooltip"><i className="far fa-clock" onClick={(e) => {
              e.preventDefault();
              onTimerClick({
                projectId: _id, 
                projectName: name, 
                projectBudget:budget, 
                projectRemaining: remaining});
            }}></i>
            <span className="tooltiptext">Project timer</span>
          </div>: ''}{'  '}
          <div className="tooltip">
            <i className="far fa-edit"></i>
            <span className="tooltiptext">Edit project</span>
          </div>
          <div className="tooltip">
            <i className="far fa-trash-alt" ></i>
            <span className="tooltiptext">Delete project</span>
          </div>
        </span>
      </p>   
    </div>
);


export default MyProjectListItem;