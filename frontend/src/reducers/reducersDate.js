 import {DATE_SELECT} from '../actions/types';


 const initialState = {

     start: new Date(),
     end: new Date(),


};

 export default function(state=initialState, action) {
//console.log("state",state);
  switch(action.type){
      case DATE_SELECT:
        return {
                start:action.payload.start,
                end:action.payload.end,

              };


        default:
               return state;
  }

 }


