import React from 'react';
import { connect } from 'react-redux';
import { deleteProject } from '../actions/projects';
import Timer from './timer';
// import CreateTask from './create-task';
import prettyMs from 'pretty-ms';
import './project-view.css';


//create method inside component and call from eventhandler
class ProjectView extends React.Component {

	onClickRemove = (e) => {
		e.preventDefault();
		this.props.dispatch(deleteProject(this.props.project._id));
    this.props.history.push('/');
  }
  
  render(){   
		return (
      <div className="project-view">
				<h1>Project Page</h1>
					<h2>{this.props.project.name}</h2>
					<h3>{this.props.project._id}</h3>
					<p>{this.props.project.description}</p>
					<h3>Project Budget: {prettyMs(this.props.project.budget)}</h3>
					<h3>Remaining Budget: {prettyMs(this.props.project.remaining)}</h3>
        
          <Timer projectId={this.props.project._id}/>
          
          
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	// console.log(state.projects);
	// console.log(props.match.params.id);
	return {
		project: state.projects.find((project) => project._id === props.match.params.id)
	};
};
export default connect(mapStateToProps)(ProjectView);