import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as authActions from '../../actions/authActions'
import Dashboard from '../../Dashboard';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import PrivateRoute from './PrivateRoute';


class Routes extends Component {
  componentDidMount() {
    console.log(this.props)
    console.log('==== Routes mounted!');
  }

  render() {
    console.log('Routes props', this.props.auth);
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <PrivateRoute exact path="/" component={Dashboard} authed={this.props.auth.isAuthenticated} />
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, authActions)(Routes);