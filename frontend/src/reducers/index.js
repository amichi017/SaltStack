import {combineReducers} from 'redux';
import time from './reducers-date';

const appReducer = combineReducers({
  date:time

});

export default appReducer;