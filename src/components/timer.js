import React from 'react';
import ms from 'pretty-ms';
import { connect } from 'react-redux';
import { updateTime } from '../actions/timer';
import { updateProject } from '../actions/projects';
import BreakTimerModal from './break-timer-modal';
import './timer.css';

export class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: this.props.work,
      isOn: false,
      start: this.props.project.remaining,
      project: this.props.project,
      projectRemaining: props.project.remaining,
      projectBudget: props.project.budget,
      projectId: props.project._id,
      timeRemains: true,
      workTime: this.props.work,
      break: false,
      breaktime: this.props.breaktime
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this) ;
    this.pauseTimer = this.pauseTimer.bind(this); 
   console.log(props.project);
  }

  startTimer() {
    if (!this.state.isOn && this.state.timeRemains && this.state.project.remaining > this.state.current) {
      this.setState({
        isOn: true,
        workTime: this.props.work,
        start: this.props.work 
      });
      this.timer = setInterval(() => this.setState({
        current: this.state.current - 1000,
        projectRemaining: this.state.project.remaining - 1000
      }), 1000);
      setTimeout( this.stopTimer, this.state.workTime);
    }
  }
  
  pauseTimer() {
    if (this.state.isOn) {
      this.setState({isOn: false});
      this.props.dispatch(updateTime(this.state.current));
      const newRemaining = this.props.project.remaining - this.state.current;
      this.props.dispatch(updateProject(this.state.project._id, {id: this.state.project._id, remaining: newRemaining}));
      clearInterval(this.timer)
    }
  }

  stopTimer() {
    console.log('stopTimer called');
    if (this.state.isOn) {
      this.setState({isOn: false});
      this.props.dispatch(updateTime(this.state.current));
      const newRemaining = this.props.project.remaining - this.props.work;
      console.log(this.props.project.remaining);
      console.log(newRemaining);
      this.props.dispatch(updateProject(this.state.project._id, {id: this.state.project._id, remaining: newRemaining}));
      clearInterval(this.timer)
    }
    //If no time remains toggle between pomodoro and break
    if(!this.state.project.remaining ){
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
        current: this.props.work,
        start: this.props.work,
        isOn: false,
        break: false, 
        breaktime: this.props.breaktime, 
        workTime: this.props.work 
      }
    ));
  };

  startBreak = () => { 
    this.setState(() => ({ break: true}));
    this.startBreakTimer();
  };

  startBreakTimer = () => {
    this.breakTimer = setInterval(() => this.setState({breaktime: this.state.breaktime - 1000}), 1000);
    setTimeout(() => { clearInterval(this.breakTimer); this.endBreak(); }, this.props.breaktime);
  }
  render() {
    let start = <button onClick={this.startTimer}>Start</button>
    let stop = <button onClick={this.pauseTimer}>Pause</button>
  
    return(
      <div className='timer-box'>
        <h3>Current Project: {this.state.project.name}</h3>
        <h3>budget: {ms(this.state.project.budget)}</h3>
        <h3>remaining:{ms(this.props.project.remaining)}</h3>
        <h3>Work Timer: {ms(this.state.current)}</h3>
        
        {start}
        {stop}
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
  return {
    remaining: state.timer.remaining,
    work: state.timer.work,
    breaktime: state.timer.break,
    projects: state.projects,
    project: state.projects.find((project) => project._id === props.projectId)
  }
};

export default connect(mapStateToProps)(Timer);