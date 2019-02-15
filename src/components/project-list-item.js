import React from 'react';
import ms from 'pretty-ms';
import { connect } from 'react-redux';
import { addProject } from '../actions/projects';
import './project-list-item.css';

const ProjectListItem = (props) => {
    function onCloneClick(){
      const clone = {
        name: props.name,
        description: props.description,
        budget: props.budget,
        remaining: props.budget,
        owner: props.user.id
      };
      console.log('clone clicked');
      console.log(clone);
      props.dispatch(addProject(clone));

    }
  return (
    <div className="list-item">
        
            <p>{props.name}:  budget: {ms(props.budget)} owner: {props.owner.username} 
            {'  '}<button onClick={onCloneClick}>Clone</button>
            </p>
       
    </div>
)};


export default connect()(ProjectListItem);