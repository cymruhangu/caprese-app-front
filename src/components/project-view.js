import React from 'react';
import { connect } from 'react-redux';
// import { deleteProject } from '../actions/projects';
// import TaskTimer from './timer';
import CreateTask from './create-task';
import MyTaskList from './my-task-list';
// import TaskListItem from './task-list-item';
import prettyMs from 'pretty-ms';
import './project-view.css';


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
            <h4>Tasks: for {this.props.project.id} </h4>
            <MyTaskList 
              projectId={this.props.project.id}
            />
          </div>
          
        </div>
					 
        <div className="task-form">
          <button onClick={() => this.setState({addTask: !this.state.addTask})}>{this.state.addTask? 'close' : 'Add Task'}</button>
          {this.state.addTask ? <CreateTask projectId={this.props.project.id}/> : ''}
        </div> 
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
    project: state.projects.find((project) => project.id === props.match.params.id),
    tasks: state.tasks,
    myTasks: state.tasks.filter(task => task.parent.id === props.match.params.id)
	};
};
export default connect(mapStateToProps)(ProjectView);