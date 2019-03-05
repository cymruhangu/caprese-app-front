import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';


class Logout extends React.Component {
  componentDidMount(){
    this.props.dispatch(clearAuth());
    clearAuthToken();
    //clear store on logout
  }

  render(){
    return (
      <Redirect to="/" />
    )
  }

}


const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Logout);
