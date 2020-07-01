
 import {SALT_RETURNS_GRAPH} from '../actions/types';


 const initialState = {
    saltReturnsGraph:null,
};

export default function(state=initialState, action) { 
console.log("saltReturnsGraph",action.payload);
switch(action.type){
    case SALT_RETURNS_GRAPH:
    return {
        saltReturnsGraph:action.payload,
    };
    default:
        return state;
 }
}