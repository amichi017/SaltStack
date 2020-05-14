import {SCREEN } from '../actions/types';


const initialState = {
    screen:null,
};

export default function(state=initialState, action) { 
//console.log("SALT_RETURNS",action.payload);
switch(action.type){
   case SCREEN:
   return {
       saltReturns:action.payload,
   };
   default:
       return state;
}
}