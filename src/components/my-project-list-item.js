import React from 'react';
// import { Link } from 'react-router-dom';
import ms from 'pretty-ms';
import './project-list-item.css';

const MyProjectListItem = ({id, name, budget, remaining, isActive, onTimerClick, onEditClick, onDeleteClick, onCompleteClick}) => (
    <div className="list-item">
        <p className='project-name'>{name}{':'}</p> 
        <div className="project-info">
          <span className='label'>budget: </span>{ms(budget)}{' '}
          <span className='label'>remaining: </span>{ms(remaining)}{' '}
          <span className='label'>status: </span>{isActive ? 'Open' : 'Completed'}{' '}
          <span className="project-controls">
            {isActive ? 
              <div className="tooltip"><i className="far fa-clock" onClick={(e) => {
                e.preventDefault();
                onTimerClick({
                  projectId: id, 
                  projectName: name, 
                  projectBudget:budget, 
                  projectRemaining: remaining});
              }}></i>
              <span className="tooltiptext">Project timer</span>
            </div>
            : ''}{'  '}
            <div className="tooltip">
              <i className="far fa-edit"
                onClick={(e) => {
                  e.preventDefault();
                  onEditClick(id);
                }}
              ></i>
              <span className="tooltiptext">Edit project</span>
            </div>
            {isActive ?
              <div className="tooltip">
              <i className="far fa-check-square" onClick={ (e) => {
                e.preventDefault();
                onCompleteClick(id);
                }}></i>
              <span className="tooltiptext">Mark as completed</span>
            </div>: ''}{'  '}
            <div className="tooltip">
              <i className="far fa-trash-alt" onClick={ (e) => {
                e.preventDefault();
                onDeleteClick(id);
                }}></i>
              <span className="tooltiptext">Delete project</span>
            </div>
          </span>
        </div>      
    </div>
);


export default MyProjectListItem;