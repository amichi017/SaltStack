
import {CURRENT_YEAR} from '../actions/types'; 

const initialState = {
    CurrentYear:[],
};

export default function(state=initialState, action) { 
   // console.log("CURRENT_YEAR",action.payload);
switch(action.type){
   case CURRENT_YEAR:
   return {
    CurrentYear:action.payload,
   };
   default:
       return state;
}
}