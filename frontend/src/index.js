import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import * as serviceWorker from './serviceWorker';
import LoginForm from './Component/LoginForm';
import RegisterForm from './Component/RegisterForm';
import { createStore } from 'redux';
import appReducer from './reducers/index';
import {Provider} from 'react-redux';
const store = createStore(appReducer);
ReactDOM.render( <Provider store={store}>
                   <Dashboard />
                </Provider> , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();