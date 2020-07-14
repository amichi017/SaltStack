
import {LAST_THREE_MONTHS_ONE,
       LAST_THREE_MONTHS_TOW,
       LAST_THREE_MONTHS_THREE
      } from '../actions/types';




let dataInitOne=[];



let temp=new Date();
// let temp=new Date(2019,10);

let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
  for (let i=1;i<=monthDayOne;i++){
    dataInitOne.push( { name: String(i), Fail:0, Success:0 });
}
////////////////////////////////////////////////////////////////////////////////////


let dataInitTow=[];

let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
  for (let i=1;i<=monthDayTow;i++){
    dataInitTow.push( { name: String(i), Fail:0, Success:0 });
}

///////////////////////////////////////////////////////////////////////////////////


let dataInitThree=[];


let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
  for (let i=1;i<=monthDayThree;i++){
    dataInitThree.push( { name: String(i), Fail:0, Success:0 });
}

const initialState = {
    dataInitOne:dataInitOne,
    dataInitTow:dataInitTow,
    dataInitThree:dataInitThree,
};

export default function(state=initialState, action) { 
//console.log("LAST_THREE_MONTHS",action.payload);
switch(action.type){
   case LAST_THREE_MONTHS_ONE:
   return {
    ...state,
    dataInitOne:action.payload,
   };
   case LAST_THREE_MONTHS_TOW:
    return {
      ...state,
      dataInitTow:action.payload,
  };
  case LAST_THREE_MONTHS_THREE:
    return {
      ...state,
      dataInitThree:action.payload,
  };
   default:
       return state;
}
}