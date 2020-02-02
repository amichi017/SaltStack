import {DATE_SELECT, SALT_RETURNS} from '../actions/types';


const initialState = {

    start: new Date(),
    end: new Date()

};

export default function(state=initialState, action) {

 switch(action.type){
     case DATE_SELECT:
       return {
               start:action.payload.start,
               end:action.payload.end,
             };
       case SALT_RETURNS:
         return {

         };

       default:
              return state;
 }

}


