import {SCREEN } from '../actions/types';


const initialState = {
    screen:[{Dashboard:false,
            SaltStack:false,
            Customers:false,
            Reports:false,
            Integrations:false,
            CurrentMonth:false,
            CurrentYear:false,
            }],
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