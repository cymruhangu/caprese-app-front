import React from 'react';
import { connect } from 'react-redux';
import { updateProjectData } from '../actions/timer';

export class TimerIntervals extends React.Component {
  constructor(props) {
    super(props);

    this.handlePomChange = this.handlePomChange.bind(this);
    this.handleBreakChange = this.handleBreakChange.bind(this);
  }

  handlePomChange(e) {
    let value;
    if (e.target.value === 'demo') {
      value = 30000;
    } else {
      value = e.target.value * 60000;
    }
    this.props.dispatch(updateProjectData({ work: value }));

  }

  handleBreakChange(e) {
    let value;
    if (e.target.value === 'demo') {
      value = 10000;
    } else {
      value = e.target.value * 60000;
    }
    this.props.dispatch(updateProjectData({ break: value }));
  }

  render() {
    return (
      <div className="time-select">
      <hr></hr>
        <h3>First Select Your Pomodoro and Break Lengths:</h3>
        <form>
          <label>Pomodoro: </label>{'  '}
          <select id="pom-select" onChange={this.handlePomChange}>
            <option value="demo" defaultValue>Demo - 30 sec</option>
            <option value="25">25 min</option>
            <option value="50">50 min</option>
            <option value="75">75 min</option>
            <option value="100">100 min</option>
          </select>{'     '}
          <label>Break: </label>{'  '}
          <select id="break-select" onChange={this.handleBreakChange}>
            <option value="demo" defaultValue>Demo - 10 sec</option>
            <option value="5">5</option>
            <option value="10">10 min</option>
            <option value="15">15 min</option>
            <option value="20">20 min</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    work: state.timer.work,
    break: state.timer.break
  };
}
export default connect(mapStateToProps)(TimerIntervals);