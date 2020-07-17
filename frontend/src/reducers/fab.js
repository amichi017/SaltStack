
import {FAB,FAB_WITH_DATA} from '../actions/types';

const initialState = {
   fab:false,
   details:{
    first_name:"",
    last_name:"",
    Role:"",
    Email:"",
    //upDate=true,
   }
};

export default function(state=initialState, action) { 
    //console.log(action.payload,'action.payload')
switch(action.type){
   case FAB:
    return {
        ...state,
        fab:action.payload,
    };
    case FAB_WITH_DATA:
    return {
        fab:true,
        details:action.payload,
    };
   default:
       return state;
}
}