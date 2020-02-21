
 import {SALT_RETURNS} from '../actions/types';


 const initialState = {
    saltReturns:null,
};

export default function(state=initialState, action) { 

switch(action.type){
    case SALT_RETURNS:
    return {
      saltReturns:action.payload.saltReturns,
    };
    default:
        return state;
 }
}