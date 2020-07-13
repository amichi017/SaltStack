<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 40c843fd8f544769c5c95c6c0fe9efaea38d9d04

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
<<<<<<< HEAD
=======
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
>>>>>>> 40c843fd8f544769c5c95c6c0fe9efaea38d9d04
}