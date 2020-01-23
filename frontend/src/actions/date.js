

 import { DATE_SELECT, CLEAR_DATE} from './types';
 // Date is select
 export const dateSelect = (start , end) => {
   
     return {
                 type: DATE_SELECT,
                 payload:{start,end}
              };
     // console.log("start ",start);
     // console.log("end ",end);
     
 }
 
 // Clear date
 export const cleardate = () => {
     return {
         type: CLEAR_DATE
     };
 };