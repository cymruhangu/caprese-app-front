import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import './landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
      <div className="splash">
        <div className="introduction">
          <h1>A Project Timer and a Pomodoro Timer </h1>
        </div>
      
        <div className="home">
          <h4>Sign in or Register</h4>
          <LoginForm />
          <Link to="/register">Register</Link>
        </div>
      </div>
        
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
