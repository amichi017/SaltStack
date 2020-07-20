<<<<<<< HEAD

import {CURRENT_YEAR} from '../actions/types'; 

const initialState = {
    CurrentYear:[],
};

export default function(state=initialState, action) { 
   // console.log("CURRENT_YEAR",action.payload);
switch(action.type){
   case CURRENT_YEAR:
   return {
    CurrentYear:action.payload,
   };
   default:
       return state;
}
=======

import {CURRENT_YEAR} from '../actions/types'; 

// let dataInit=[];
//     // let temp=new Date(2019,10);
// dataInit.push( { name: String('January'), Fail:0, Success:0 });
// dataInit.push( { name: String('February'), Fail:0, Success:0 });
// dataInit.push( { name: String('March'), Fail:0, Success:0 });
// dataInit.push( { name: String('April'), Fail:0, Success:0 });
// dataInit.push( { name: String('May '), Fail:0, Success:0 });
// dataInit.push( { name: String('June  '), Fail:0, Success:0 });
// dataInit.push( { name: String('July  '), Fail:0, Success:0 });
// dataInit.push( { name: String('August '), Fail:0, Success:0 });
// dataInit.push( { name: String('September '),Fail:0, Success:0 });
// dataInit.push( { name: String('October '), Fail:0, Success:0 });
// dataInit.push( { name: String('November  '),Fail:0, Success:0 });
// dataInit.push( { name: String('December '), Fail:0, Success:0 });
const initialState = {
    CurrentYear:[],
};

export default function(state=initialState, action) { 
   // console.log("CURRENT_YEAR",action.payload);
switch(action.type){
   case CURRENT_YEAR:
   return {
    CurrentYear:action.payload,
   };
   default:
       return state;
}
>>>>>>> 00ce104ffbc429e346bb4ddc2db5d08d084aed1f
}