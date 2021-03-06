import React from 'react';
import ms from 'pretty-ms';
import { connect } from 'react-redux';
import { addProject } from '../actions/projects';
import './project-list-item.css';

const ProjectListItem = (props) => {
  function onCloneClick() {
    const clone = {
      name: props.name,
      description: props.description,
      budget: props.budget,
      remaining: props.budget,
      owner: props.user.id
    };
    props.dispatch(addProject(clone));
  }

  return (
    <div className="list-item">
      <p>{props.name}:{'   '} {ms(props.budget)}
        {'   '}
      </p>
      <div className="tooltip">
        <button className="clone" onClick={onCloneClick}>{'   '}Clone</button>
        <span className="tooltiptext">Clone this project!</span>
      </div>
    </div>
  )
};


export default connect()(ProjectListItem);