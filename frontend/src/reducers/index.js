import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import reducerDate from './reducersDate';
import saltReturns  from './saltReturns';
import saveMinion  from './saveMinion';
import listMinions  from './listMinions';
import graphDate  from './graphDate';
import saltReturnsGraph  from './saltReturnsGraph';
const appReducer = combineReducers({
  saltReturns:saltReturns,
  saltReturnsGraph:saltReturnsGraph,
  date: reducerDate,
  graphDate:graphDate,
  auth: authReducer,
  error: errorReducer,
  saveMinion:saveMinion,
  listMinions:listMinions,
  

});

export default appReducer;
