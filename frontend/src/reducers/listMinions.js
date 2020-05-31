
import {LIST_MINIONS} from '../actions/types';


const initialState = {
   listMinions:[],
};

export default function(state=initialState, action) { 
    console.log(action.payload,'action.payload')
switch(action.type){
   case LIST_MINIONS:
    return {
        listMinions:action.payload,
    };
   default:
       return state;
}
}