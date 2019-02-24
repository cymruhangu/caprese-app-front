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
      closeOpen: false,
      navDisplay: true
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
    this.setState(() => ({ hamburgerOpen: false, closeOpen: true, navDisplay: true}));
  }

  handleCloseClick() {
    this.setState(() => ({ closeOpen: false, hamburgerOpen: true, navDisplay: false }));
  }

  render() {
    let activeNav;
    if (this.props.loggedIn) {
      activeNav = (
        <div className="active-nav">
          <ul>
            <li><NavLink to="/" activeClassName="is-active">Home</NavLink></li>
            <li><NavLink to="/my-projects" activeClassName="is-active">My Projects</NavLink></li>
            <li><NavLink to="/projectcreate" activeClassName="is-active">Create Project</NavLink></li>
            <li><NavLink to="/projects" activeClassName="is-active">Project Templates</NavLink></li>
            <li><NavLink to="/logout" activeClassName="is-active">Logout</NavLink></li>
          </ul>
        </div>
      );
    }

    return (
      <header className="header-bar">
        <div className="title-bar">
          <i className="far fa-clock"></i>
          <h1>Caprese Project Timer</h1>
        </div>
        <div className="nav">
          {this.state.navDisplay ? <div className="active-container">
            {activeNav}
          </div>: ''}
          
          <div className="hamburger">
          {this.state.hamburgerOpen ?
            <i className="fas fa-bars" onClick={this.handleHamburgerClick}></i> :
            <i className="fas fa-times" onClick={this.handleCloseClick}></i>}
        </div>
        </div>
       
        
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
