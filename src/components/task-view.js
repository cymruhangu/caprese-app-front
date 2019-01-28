import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../actions/tasks';
import Timer from './timer';
import CreateTask from './create-task';
import prettyMs from 'pretty-ms';
import './task-view.css';


//create method inside component and call from eventhandler
class TaskView extends React.Component {
  constructor(props){
    super(props);
    this.state = {addTask: false}
  }
  
  onClickRemove = (e) => {
		e.preventDefault();
		this.props.dispatch(deleteTask(this.props.task._id));
    this.props.history.push('/');
  }
  
  render(){   
		return (
      <div className="task-view">
				<h1>Task Page</h1>
					<h2>{this.props.task.name}</h2>
					<h3>{this.props.task._id}</h3>
          <p>{this.props.task.description}</p>
          <p>{this.props.task.tasks[0] ? this.props.task.tasks[0] : 'No tasks'}</p>
					<h3>Task Budget: {prettyMs(this.props.task.budget)}</h3>
					<h3>Remaining Budget: {prettyMs(this.props.task.remaining)}</h3>
        
          <Timer taskId={this.props.task._id}/>
          
          <div className="task-form">
            <button onClick={() => this.setState({addTask: !this.state.addTask})}>{this.state.addTask? 'close' : 'Add Task'}</button>
            {this.state.addTask ? <CreateTask taskId={this.props.task._id}/> : ''}
      
          </div>
          
          
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	// console.log(state.tasks);
	// console.log(props.match.params.id);
	return {
		task: state.tasks.find((task) => task._id === props.match.params.id)
	};
};
export default connect(mapStateToProps)(TaskView);