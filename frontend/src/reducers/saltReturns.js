
 import {SALT_RETURNS} from '../actions/types';


 const initialState = {
    saltReturns:null,
};

export default function(state=initialState, action) { 
 //console.log("SALT_RETURNS",action.payload);
switch(action.type){
    case SALT_RETURNS:
    return {
        saltReturns:action.payload,
    };
    default:
        return state;
 }
}