import React from 'react';

export default class TimerOutput extends React.Component {
    render() {
       return (
        <div>
         <h3> {this.props.minutes}:{this.props.seconds}</h3>
        </div>
      );
    }
  }