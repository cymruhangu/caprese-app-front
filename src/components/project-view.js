import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { deleteProject } from '../actions/projects';
import Timer from './timer';
import prettyMs from 'pretty-ms';

class ProjectView extends React.Component {
render(){   
    console.log(this.props.project);
    const id = this.props.project._id;
    return (
        <div>
            <h1>Project Page</h1>
                <h2>{this.props.project.name}</h2>
                <h3>{this.props.project._id}</h3>
                <p>{this.props.project.description}</p>
                <h3>Project Budget: {prettyMs(this.props.project.budget)}</h3>
                <h3>Remaining Budget: {prettyMs(this.props.project.remaining)}</h3>
            
                <button onClick={(e) => {
                    e.preventDefault();
                    this.props.dispatch(deleteProject({id}));
                    this.props.history.push('/'); 
                }}>Remove</button>
                <Timer id={id}/>
            </div>

    )
}
    
}


const mapStateToProps = (state, props) => {
    return {
        project: state.projects.projects[0].find((project) => project._id === props.match.params.id)
    };
};
export default connect(mapStateToProps)(ProjectView);