import React from 'react';
import ms from 'pretty-ms';
import { connect } from 'react-redux';
import { updateProjectData } from '../actions/timer';
import { updateProject } from '../actions/projects';
import BreakTimerModal from './break-timer-modal';
import './timer.css';

export class Timer2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: this.props.work,
      isOn: false,
      start: '',
      project: '',
      projectRemaining: this.props.timer.projectRemaining,
      projectBudget: '',
      projectId: '',
      timeRemains: true,
      break: false,
      breaktime: this.props.breaktime
    }
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  
  }

  startTimer() {
    console.log('start timer clicked');
    if (!this.state.isOn && this.state.timeRemains && this.props.timer.projectRemaining > this.state.current) {
      this.setState({
        isOn: true,
        workTime: this.props.work,
        start: this.props.work 
      });
      this.timer = setInterval(() => this.setState({
        current: this.state.current - 1000,
        projectRemaining: this.state.projectRemaining - 1000
      }), 1000);
      setTimeout(this.stopTimer, this.props.timer.work);
    }
  }

  stopTimer() {
    console.log('stopTimer called');
    if (this.state.isOn) {
      this.setState({ isOn: false });
      const newRemaining = this.props.timer.projectRemaining - this.props.work;
      this.props.dispatch(updateProjectData({ remaining: this.state.current, projectRemaining: newRemaining }));
      this.props.dispatch(updateProject(this.props.timer.projectId, { id: this.props.timer.projectId, remaining: newRemaining }));
      clearInterval(this.timer)
    }
    //If no time remains toggle between pomodoro and break
    if (!this.props.timer.projectRemaining) {
      console.log('No time left in project!');
      this.setState({
        timeRemains: false
      });
      //start break
      // POP up MODAL with Break Timer and close button
      this.startBreak();
    }
    if (this.state.current === 0) {
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
        breaktime: this.props.breaktime
      }
    ));
  };

  startBreak = () => {
    this.setState(() => ({ break: true }));
    this.startBreakTimer();
  };

  startBreakTimer = () => {
    this.breakTimer = setInterval(() => this.setState({ breaktime: this.state.breaktime - 1000 }), 1000);
    setTimeout(() => { clearInterval(this.breakTimer); this.endBreak(); }, this.props.timer.break);
  }
  render() {
  
    let CurrentProject = this.props.timer.projectId ? this.props.projects.find((project) => project.id === this.props.timer.projectId) : 'No project selected';
    return (
      <div className='timer-box'>
        <h3>You are working on:</h3>
        <span className="timed-project">{this.props.timer.projectName ? this.props.timer.projectName : 'No project selected'}</span>
        <h3>budget: {this.props.timer.projectBudget ? ms(this.props.timer.projectBudget) : 0}</h3>
        <h3>remaining:{CurrentProject.id ? ms(CurrentProject.remaining) : 0}</h3>
        <h3>Work Timer: {ms(this.state.current)}</h3>

        {CurrentProject.id ? <button className="start-button" onClick={this.startTimer}>Start</button>: ''}
      
        <BreakTimerModal
          breakOn={this.state.break}
          endBreak={this.endBreak}
          breakTime={this.state.breaktime}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    timer: state.timer,
    remaining: state.timer.remaining,
    work: state.timer.work,
    breaktime: state.timer.break,
    projects: state.projects,
    project: state.projects.find((project) => project._id === props.projectId)
  }
};

export default connect(mapStateToProps)(Timer2);