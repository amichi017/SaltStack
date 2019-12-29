import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

 
  render() {
    return (
        <button onClick={this.props.logout}>
          Logout
        </button>
    );
  }
}


export default connect(
  null,
  { logout }
)(Logout);