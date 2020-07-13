<<<<<<< HEAD

 import {SALT_RETURNS_GRAPH} from '../actions/types';


 const initialState = {
    saltReturnsGraph:null,
};

export default function(state=initialState, action) { 

switch(action.type){
    case SALT_RETURNS_GRAPH:
    return {
        saltReturnsGraph:action.payload,
    };
    default:
        return state;
 }
=======

 import {SALT_RETURNS_GRAPH} from '../actions/types';


 const initialState = {
    saltReturnsGraph:null,
};

export default function(state=initialState, action) { 

switch(action.type){
    case SALT_RETURNS_GRAPH:
    return {
        saltReturnsGraph:action.payload,
    };
    default:
        return state;
 }
>>>>>>> f7b6b1be5afdfc635c9535a61c4215ff5157700a
}