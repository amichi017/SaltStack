import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import reducerDate from './reducersDate';
import saltReturns  from './saltReturns';
import saveMinion  from './saveMinion';

const appReducer = combineReducers({
  saltReturns:saltReturns,
  date: reducerDate,
  auth: authReducer,
  error: errorReducer,
  saveMinion:saveMinion,

});

export default appReducer;
