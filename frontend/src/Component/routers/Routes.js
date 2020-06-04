import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as authActions from '../../actions/authActions'
import Dashboard from '../../Dashboard';
import LoginForm from '../auth/LoginForm';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import PropTypes from 'prop-types';
import ForgotPasswordForm from '../auth/ForgotPasswordForm';

class Routes extends Component {


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

    // Similar to componentDidMount and componentDidUpdate:
  render() {

    return (
      <BrowserRouter>
        <div>
          <PrivateRoute exact path="/" component={Dashboard} authed={this.props.auth.isAuthenticated} />
          <Route exact path="/login" component={LoginForm} />


        </div>
      </BrowserRouter>

    );
  }
}

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  // console.log("private routhh", authed),
  <Route
    {...rest}
    render={props => (
      authed
        ? <Component {...props} />
        : <LoginForm {...props}/>
    )}
  />
);


const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, authActions)(Routes);
