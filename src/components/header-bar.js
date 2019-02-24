import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './header-bar.css';

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerOpen: true,
      closeOpen: false
    }
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  handleHamburgerClick() {
    this.setState(() => ({ hamburgerOpen: false, closeOpen: true}));
  }

  handleCloseClick() {
    this.setState(() => ({ closeOpen: false, hamburgerOpen: true }));
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
        <div className="hamburger">
          {this.state.hamburgerOpen ?
            <i className="fas fa-bars" onClick={this.handleHamburgerClick}></i> :
            <i className="fas fa-times" onClick={this.handleCloseClick}></i>}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
