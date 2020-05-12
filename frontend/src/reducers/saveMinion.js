
import {SAVE_MINION} from '../actions/types';


 const initialState = {
    saveMinion:[],
};

export default function(state=initialState, action) { 
 //console.log("SALT_RETURNS",action.payload);
switch(action.type){
    case SAVE_MINION:
    return {
        saveMinion:action.payload,
    };
    default:
        return state;
 }
}