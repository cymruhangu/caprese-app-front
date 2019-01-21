import React from 'react';
import {connect} from 'react-redux';
import { NavLink , Redirect} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
    return <Redirect to="/" />;
  }

    render() {
      // Only render the log out button if we are logged in
      let logOutButton;
      let activeNav;
      if (this.props.loggedIn) {
          logOutButton = (
              <button onClick={() => {this.logOut()}}>Log out</button>
          );
          activeNav = (
          <div className="active-nav">
            <NavLink to="/" activeClassName="is-active">Home</NavLink>
            <NavLink to="/projects" activeClassName="is-active">View All Projects</NavLink>
            <NavLink to="/my-projects" activeClassName="is-active">View My Projects</NavLink>
            <NavLink to="/projectcreate" activeClassName="is-active">Create Project</NavLink>
          </div>
          );
      }

      

      return (
        <header className="header-bar">
          <i className="far fa-clock"></i>
          <h1>Caprese Project Timer</h1>
          {activeNav}
          {logOutButton}
        </header>
      );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
