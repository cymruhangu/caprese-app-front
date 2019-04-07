import React from 'react';
import FadeIn from 'react-fade-in';
// import {Redirect} from 'react-router-dom';
import './RealSplash.css';
import LandingPage from './landing-page';


class RealSplash extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }
    this.renderRedirect = this.renderRedirect.bind(this);
  }
  
renderRedirect() {
    console.log('redirect clicked');
    this.setState({redirect: true});
}

  render() {
    console.log(this.state.redirect);
    if (this.state.redirect) {
      return <LandingPage />
    }
    return (
      <div className="app-intro">
        <div className="banner">
          <FadeIn 
            delay={1700}
            transitionDuration={800}
            >
            <div><h1>It's a necessity to log the time you spend on a project or task.</h1></div>
            <div><h1>While working, learning, or playing.</h1></div>
            <div><h1>Pomodoro timers are great.</h1></div>
            <div><h1>But so much more can be done with tomatoes...</h1></div>
            <div className="app-title"><h1>The Caprese App</h1></div>
            <div><button className="enter-app" onClick={this.renderRedirect}
            >Enter</button></div>
          </FadeIn>
        </div>
        
      </div>
    );
  }
}
  
export default RealSplash;