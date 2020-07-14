import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import reducerDate from './reducersDate';
import saltReturns  from './saltReturns';
import saveMinion  from './saveMinion';
import listMinions  from './listMinions';
import graphDate  from './graphDate';
import saltReturnsGraph  from './saltReturnsGraph';
import CurrentMonth  from './CurrentMonth';
import CurrentYear  from './CurrentYear';
import LastThreeMonths  from './LastThreeMonths';
const appReducer = combineReducers({
  saltReturns:saltReturns,
  saltReturnsGraph:saltReturnsGraph,
  date: reducerDate,
  graphDate:graphDate,
  auth: authReducer,
  error: errorReducer,
  saveMinion:saveMinion,
  listMinions:listMinions,
  CurrentMonth:CurrentMonth,
  CurrentYear:CurrentYear,
  LastThreeMonths:LastThreeMonths,
  

});

export default appReducer;
