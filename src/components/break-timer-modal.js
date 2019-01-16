import React from 'react';
import Modal from 'react-modal';
import ms from 'pretty-ms';

const BreakTimerModal = (props) => (
    <Modal 
        isOpen={!!props.breakOn}
        onRequestClose={props.endBreak}
        contentLabel="Break Timer Open"
        ariaHideApp={false}
    > 
        <h1>Break Timer!!!</h1>
            <p>{ms(props.breakTime)}</p>
        <button onClick={props.endBreak}>Close</button>
    </Modal>
);

//get break timer from store and start timer.
//the break timer doesn't need to dispatch any actions. Yay




export default BreakTimerModal;
// this.breakTimer = setInterval(() => this.setState({breaktime: this.state.breaktime - 1000}), 1000);
//     setTimeout(() => { clearInterval(this.breakTimer); this.setState({break: false, breaktime: this.props.break, current: this.props.work, timeRemains: true}); }, 10000);