import React from 'react';
import { Link } from 'react-router-dom';
import ms from 'pretty-ms';

const ProjectListItem = ({_id, name, owner, description, budget, remaining}) => (
    <div>
        <Link to={`/projects/${_id}`}>
            <h3>Project Name: {name}</h3>
        </Link>
        
        <p>budget: {ms(budget)} remaining: {ms(remaining)}</p>
        <p>{description}</p>
    </div>
);


export default ProjectListItem;