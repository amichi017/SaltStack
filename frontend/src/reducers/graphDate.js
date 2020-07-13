import {GRAPH_DATE_SELECT} from '../actions/types';


const initialState = {

    graphDate: new Date(),


};

export default function(state=initialState, action) {
//console.log("state",state);
 switch(action.type){
     case GRAPH_DATE_SELECT:
       return {
                graphDate:action.payload.graphDate,
              
             };


       default:
              return state;
 }

}


