import React from 'react';
import ms from 'pretty-ms';
import { connect } from 'react-redux';
import { updateTime, updateProjectId } from '../actions/timer';
// import { editProject } from '../actions/projects';
import BreakTimerModal from './break-timer-modal';
import './timer.css';

export class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current: this.props.work,
      isOn: false,
      start: this.props.remaining,
      id: this.props.id,
      timeRemains: true,
      workTime: this.props.work,
      break: false,
      breaktime: this.props.breaktime
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)  
    this.pauseTimer = this.pauseTimer.bind(this)  
  }

  startTimer() {
    console.log('start timer clicked');
    console.log(this.state);
    if (!this.state.isOn && this.state.timeRemains) {
      this.setState({
        isOn: true,
        work: this.props.remaining,
        start: this.props.remaining
      });
      this.timer = setInterval(() => this.setState({
        current: this.state.current - 1000
      }), 1000);
      this.props.dispatch(updateProjectId(this.state.id));
      setTimeout( this.stopTimer, this.state.workTime);
    }
  }
  
  pauseTimer() {
    console.log('pauseTimer called');
    if (this.state.isOn) {
      this.setState({isOn: false});
      this.props.dispatch(updateTime(this.state.current));
      const newRemaining = this.props.project.remaining - this.state.current;
      console.log(newRemaining);
      // this.props.dispatch(editProject(this.props.project.id, {remaining: newRemaining}));
      clearInterval(this.timer)
    }
  }


  stopTimer() {
    console.log('stopTimer called');
    console.log(this.state);
    if (this.state.isOn) {
      this.setState({isOn: false});
      this.props.dispatch(updateTime(this.state.current));
      const newRemaining = this.props.project.remaining - this.props.work;
      console.log(this.props.project.remaining);
      console.log(newRemaining);
      // this.props.dispatch(editProject(this.props.project.id, {remaining: newRemaining}));
      clearInterval(this.timer)
    }
    //If no time remains toggle between pomodoro and break
    if(!this.props.project.remaining ){
      console.log('No time left in project!');
      this.setState({
        timeRemains: false
      });
      //start break
      // POP up MODAL with Break Timer and close button
      this.startBreak();
    }
    
    this.startBreak();
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
    // let resume = <button onClick={this.startTimer}>resume</button>
    return(
      <div>
        <h2>{!this.state.break ? 'Work Time' : 'Break Time' }</h2>
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

const mapStateToProps = (state, props) => ({
  remaining: state.timer.remaining,
  work: state.timer.work,
  breaktime: state.timer.break,
  project: state.projects.projects[0].find((project) => project._id === props.id)
});

export default connect(mapStateToProps)(Timer);