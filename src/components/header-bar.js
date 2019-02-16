import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    // this.props.history.push('/');
    this.props.dispatch(clearAuth());
    clearAuthToken();
     // return <Redirect to="/" />;
  }

    render() {
      // Only render the log out button if we are logged in
      let activeNav;
      if (this.props.loggedIn) {
        activeNav = (
          <div className="active-nav">
            <NavLink to="/" activeClassName="is-active">Home</NavLink>
            <NavLink to="/my-projects" activeClassName="is-active">My Projects</NavLink>
            <NavLink to="/projectcreate" activeClassName="is-active">Create Project</NavLink>
            <NavLink to="/projects" activeClassName="is-active">Project Templates</NavLink>
            <NavLink to="/logout" activeClassName="is-active">Logout</NavLink>
          </div>
          );
      }

      

      return (
        <header className="header-bar">
          <i className="far fa-clock"></i>
          <h1>Caprese Project Timer</h1>
          {activeNav}
        </header>
      );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
