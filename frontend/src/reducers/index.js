import {combineReducers} from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import reducerDate from './reducersDate';

const appReducer = combineReducers({
  date: reducerDate,
  auth: authReducer,
  error: errorReducer,

});

export default appReducer;