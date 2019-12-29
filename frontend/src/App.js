import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from "./Dashboard";
import LoginForm from './Component/auth/LoginForm';
import RegisterForm from './Component/auth/RegisterForm';
import { createStore } from 'redux';
import appReducer from './reducers/index';
import {Provider} from 'react-redux';
import { loadUser } from './actions/authActions';
import { Store, ExitToApp } from '@material-ui/icons';
import store from './store';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import Landing from './Landing';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
       <Landing />
      </Provider>
    );
  }
}

export default App;