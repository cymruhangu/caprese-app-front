import React from 'react';
import { connect } from 'react-redux';
// import { deleteProject } from '../actions/projects';
// import TaskTimer from './timer';
import CreateTask from './create-task';
import MyTaskList from './my-task-list';
// import TaskListItem from './task-list-item';
import prettyMs from 'pretty-ms';
import './project-view.css';


//create method inside component and call from eventhandler
class ProjectView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addTask: false
    }
  }
  
  render(){   
    return (
      <div className="project-view">
        <div className="project-info">
          <h2><span className="label">Project:{' '}</span>{this.props.project.name}</h2>
          <p><span className="label">Description:{' '}</span>{this.props.project.description}</p>
          <div className="budget">
            <h4>Budget: {prettyMs(this.props.project.budget)}{'  '}Remaining: {prettyMs(this.props.project.remaining)}</h4>
          </div>
          <div className="tasks">
            <h3>Tasks:</h3>
            <MyTaskList 
              projectId={this.props.project._id}
            />
          </div>
          
        </div>
					 
        <div className="task-form">
          <button onClick={() => this.setState({addTask: !this.state.addTask})}>{this.state.addTask? 'close' : 'Add Task'}</button>
          {this.state.addTask ? <CreateTask projectId={this.props.project._id}/> : ''}
        </div> 
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	// console.log(state.projects);
	// console.log(props.match.params.id);
	return {
    project: state.projects.find((project) => project._id === props.match.params.id),
    tasks: state.tasks,
    myTasks: state.tasks.filter(task => task.parent._id === props.match.params.id)
	};
};
export default connect(mapStateToProps)(ProjectView);