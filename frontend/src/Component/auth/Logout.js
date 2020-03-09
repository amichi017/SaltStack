import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import store from '../../store';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };


  render() {
    // console.log(this.props)
    return (
        <button onClick={()=> store.dispatch(logout())}>
          Logout
        </button>
    );
  }
}



export default connect(
  null,
  { logout }
)(Logout);