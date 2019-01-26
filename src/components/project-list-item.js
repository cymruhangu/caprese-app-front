import React from 'react';
import { Link } from 'react-router-dom';
import ms from 'pretty-ms';
import './project-list-item.css';

const ProjectListItem = ({_id, name, budget, owner, isActive}) => (
    <div className="list-item">
        <Link to={`/projects/${_id}`}>
            <p>{name}:  budget: {ms(budget)} owner: {owner.username} status: {isActive ? 'Open' : 'Closed'}</p>
        </Link>
    </div>
);


export default ProjectListItem;