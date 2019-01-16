import React from 'react';

export default class TimerButton extends React.Component {
    render() {
      return(
       <div>
        <button onClick={this.props.startCountDown}>Start</button>
      </div>
       );
   }
 }