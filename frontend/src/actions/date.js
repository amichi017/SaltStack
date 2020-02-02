import axios from 'axios';

 import { DATE_SELECT, SALT_RETURNS} from './types';
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
 export const saltReturns =  () => (dispatch, getState) => {
     axios.get('"http://127.0.0.1:5000/"')
    .then(res => dispatch({
        type: SALT_RETURNS,
        payload: res.data
    }))
    // .catch(err => {
    //     dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    //     dispatch({
    //         type: REGISTER_FAIL
    //     })
    //    })
};