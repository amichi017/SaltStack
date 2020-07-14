
import {LAST_THREE_MONTHS} from '../actions/types';


const initialState = {
    LastThreeMonths:{one:[],tow:[],three:[]}
};

export default function(state=initialState, action) { 
  //  console.log("LAST_THREE_MONTHS",action.payload);
switch(action.type){
   case LAST_THREE_MONTHS:
   return {
    LastThreeMonths:action.payload,
   };
   default:
       return state;
}
}