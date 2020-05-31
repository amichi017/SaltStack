
import {TEAM_LIST} from '../actions/types';


const initialState = {
   teamList:[],
};

export default function(state=initialState, action) { 
//console.log("SALT_RETURNS",action.payload);
switch(action.type){
   case TEAM_LIST:
   return {
     teamList:action.payload,
   };
   default:
       return state;
}
}