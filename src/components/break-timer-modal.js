import React from 'react';
import Modal from 'react-modal';
import ms from 'pretty-ms';
import './break-modal-timer.css';


const BreakTimerModal = (props) => (
    <Modal 
        isOpen={!!props.breakOn}
        onRequestClose={props.endBreak}
        contentLabel="Break Timer Open"
        ariaHideApp={false}
        className="Modal"
        overlayClassName='Overlay'
    > 
        <div className="break-message">
          <h1>Time for a Break</h1>
          <p><q className="q-left">There is virtue in work and there is virtue in rest</q></p>
          <p><q className="q-right">Use both and overlook neither</q></p>
          <p>-Alan Cohen</p>
          <p>{ms(props.breakTime)}</p>
          <button onClick={props.endBreak}>Close</button>
        </div>
        
    </Modal>
);

//get break timer from store and start timer.
//the break timer doesn't need to dispatch any actions. Yay




export default BreakTimerModal;
// this.breakTimer = setInterval(() => this.setState({breaktime: this.state.breaktime - 1000}), 1000);
//     setTimeout(() => { clearInterval(this.breakTimer); this.setState({break: false, breaktime: this.props.break, current: this.props.work, timeRemains: true}); }, 10000);