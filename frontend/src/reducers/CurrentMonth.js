
import {CURRENT_MONTH} from '../actions/types';

// let temp=new Date();
// let dataInit=[];
// let mnonthDay =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
// for (let i=1;i<=mnonthDay;i++){
//     dataInit.push( { name: String(i), Fail:0, Success:0 });
// }
const initialState = {
    CurrentMonth:[],
};

export default function(state=initialState, action) { 
   // console.log("CURRENT_MONTH",action.payload);
switch(action.type){
   case CURRENT_MONTH:
   return {
    CurrentMonth:action.payload,
   };
   default:
       return state;
}
}