import React, { Component } from 'react';


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