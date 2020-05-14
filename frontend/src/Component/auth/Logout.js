import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import store from '../../store';
import Button from '@material-ui/core/Button';
export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };


  render() {
    // console.log(this.props)
    return (
        <Button  style={{color:'#fff',border:'none'}}  variant='outlined'  onClick={()=> store.dispatch(logout())}>
          Log out
        </Button>
    );
  }
}



export default connect(
  null,
  { logout }
)(Logout);