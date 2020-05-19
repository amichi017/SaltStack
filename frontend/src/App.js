import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import Dashboard from "./Dashboard";
import LoginForm from './Component/auth/LoginForm';
import RegisterForm from './Component/auth/RegisterForm';
import { createStore } from 'redux';
import appReducer from './reducers/index';
import {Provider} from 'react-redux';
import { loadUser } from './actions/authActions';
//import { saltReturns } from './actions/date';
import { Store, ExitToApp } from '@material-ui/icons';
import store from './store';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Routes from './Component/routers/Routes';

class App extends Component {
  constructor(props) {
    // console.log("rendering")
    super(props);
  }

  componentDidMount() {
    // console.log("dispatchhhhh from App")
    //store.dispatch(loadUser());
    //console.log(store.getState(),"state from app");


  }


  static propTypes = {
    auth: PropTypes.object.isRequired
  };


  render() {
     return (
      <Routes />
     )

  }
}




const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  null
)(App);