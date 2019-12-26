import {combineReducers} from 'redux';
import time from './reducers-date';
import errorReducer from './errorReducer';
import authReducer from './authReducer';


const appReducer = combineReducers({
  date:time,
  auth: authReducer,
  error: errorReducer,

});

export default appReducer;