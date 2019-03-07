import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
  if (props.loggedIn) {
      return <Redirect to="/dashboard" />;
  }
  return (
      <section className="home">
          <h2>Register for Caprese App</h2>
          <RegistrationForm />
          <Link to="/">Login</Link>
      </section>
  );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
