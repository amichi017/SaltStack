import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import reducerDate from './reducersDate';
import  saltReturns  from './saltReturns';

const appReducer = combineReducers({
  saltReturns:saltReturns,
  date: reducerDate,
  auth: authReducer,
  error: errorReducer,

});

export default appReducer;