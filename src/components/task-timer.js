import React from 'react';
import ms from 'pretty-ms';
import { connect } from 'react-redux';
import { updateProjectData } from '../actions/timer';
import { updateTask} from '../actions/tasks';
import BreakTimerModal from './break-timer-modal';
import './timer.css';

export class TaskTimer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: this.props.timer.work,
      isOn: false,
      start: '',
      timeRemains: true,
      projectRemaining: this.props.timer.projectRemaining,
      workTime: '',
      break: false,
      breaktime: this.props.timer.break
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this) ;
    // this.pauseTimer = this.pauseTimer.bind(this); 
  //  console.log(props.project);
  }

  startTimer() {
    console.log('start timer clicked');
    if (!this.state.isOn && this.state.timeRemains) {
      console.log('got in here');
      this.setState({
        isOn: true,
        workTime: this.props.timer.work,
        start: this.props.timer.work,
        projectRemaining: this.props.timer.projectRemaining
      });
      console.log(this.state);
      this.timer = setInterval(() => {
        this.setState({
          current: this.state.current - 1000,
          projectRemaining: this.state.projectRemaining - 1000
      });
      console.log(this.state.current);
      this.props.dispatch(updateProjectData({remaining: this.state.current, projectRemaining: this.state.projectRemaining}));
    
    }, 1000);
      // this.timer = setInterval(() => this.setState({
      //   current: this.state.current - 1000,
      //   projectRemaining: this.state.projectRemaining - 1000
      // }), 1000);
      // this.props.dispatch(updateProjectId(this.state.id));
      setTimeout( this.stopTimer, this.props.timer.work);
    }
  }
  

  stopTimer() {
    console.log('stopTimer called');
    // console.log(this.state);
    if (this.state.isOn) {
      this.setState({isOn: false});
      const newRemaining = this.props.timer.projectRemaining - this.props.timer.work;
      console.log(this.props.timer.projectRemaining);
      console.log(newRemaining);
      this.props.dispatch(updateProjectData({remaining: this.state.current, projectRemaining: newRemaining}));
      this.props.dispatch(updateTask(this.props.timer.projectId, {id: this.props.timer.projectId, remaining: newRemaining}));
      clearInterval(this.timer)
    }
    //If no time remains toggle between pomodoro and break
    if(!this.props.timer.projectRemaining ){
      console.log('No time left in project!');
      this.setState({
        timeRemains: false
      });
      //start break
      // POP up MODAL with Break Timer and close button
      this.startBreak();
    }
    if(this.state.current === 0){
      this.startBreak();
    }
  }

  endBreak = () => { 
    this.setState(() => (
      { 
        current: this.props.timer.work,
        start: this.props.timer.work,
        isOn: false,
        break: false, 
        breaktime: this.props.timer.break
      }
    ));
  };

  startBreak = () => { 
    this.setState(() => ({ break: true}));
    this.startBreakTimer();
  };

  startBreakTimer = () => {
    this.breakTimer = setInterval(() => this.setState({breaktime: this.props.timer.break - 1000}), 1000);
    setTimeout(() => { clearInterval(this.breakTimer); this.endBreak(); }, this.props.timer.break);
  }
  render() {
    //Disable buttons if no project 
    let start = <button onClick={this.startTimer}>Start</button>
    // let stop = <button onClick={this.pauseTimer}>Pause</button>
    let CurrentTask = this.props.timer.projectId ? this.props.tasks.find((task) => task._id === this.props.timer.projectId) : 'No project selected';
    return(
      <div className='timer-box'>
        <h3>Current Task: {this.props.timer.projectName ? this.props.timer.projectName : 'No project selected'}</h3>
        <h3>budget: {this.props.timer.projectBudget ? ms(this.props.timer.projectBudget): 0 }</h3>
        <h3>remaining:{CurrentTask._id ? ms(CurrentTask.remaining): 0}</h3>
        <h3>Work Timer: {ms(this.state.current)}</h3>
        <h4>{CurrentTask._id}</h4>
        {start}
        <BreakTimerModal 
          breakOn={this.state.break}
          endBreak={this.endBreak}
          breakTime={this.state.breaktime}
        />
        <div>
  
          <button onClick={this.startBreak}>Open Modal</button>

        </div>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state.timer);
  return {
    timer: state.timer,
    remaining: state.timer.remaining,
    work: state.timer.work,
    projects: state.projects,
    project: state.projects.find((project) => project._id === props.projectId),
    tasks: state.tasks,
    task: state.tasks.find((task) => task._id === props.taskId)
  }
};

export default connect(mapStateToProps)(TaskTimer);