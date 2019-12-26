import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from "./Dashboard";
import LoginForm from './Component/auth/LoginForm';
import RegisterForm from './Component/RegisterForm';
import { createStore } from 'redux';
import appReducer from './reducers/index';
import {Provider} from 'react-redux';
import { loadUser } from './actions/authActions';
import { Store } from '@material-ui/icons';
import store from './store';


import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
class App extends Component {
  componentDidMount(){
    

  };
  

  static propTypes = {
    auth: PropTypes.object.isRequired
  };


  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <Provider store={store} >
      <BrowserRouter>
          <Switch>
              {/* <Route path="/register" component={ RegisterForm}/> */}
              <PrivateRoute  exact path="/" isLoggedIn={ isAuthenticated } component={Dashboard} />
              <Route path="/login" component={ LoginForm}/>
              <Route path="*" component={() => 
                <h1>
                  404 NOT FOUND
                  </h1>} />
            </Switch>  
      </BrowserRouter>
      </Provider>
      
             
    );
  }
}




const PrivateRoute = ({ component: Component,isLoggedIn, ...props }) => 
{
  return (
    <Route
      {...props}
      render = {(props) => isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(App);

