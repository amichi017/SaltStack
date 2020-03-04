import axios from 'axios';
import store from '../store'
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
     const time =new Date().toDateString();
     axios.get('http://127.0.0.1:5000/api/saltReturns/apply', tokenConfig(getState))
    .then((res) => { 
        console.log(res,"res");
    store.dispatch({
        type: SALT_RETURNS,
        payload: res.data
    })})
    .catch(err => {
        console.log(err,"error in data");
       });
};



// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if(token) {
       config.headers["Authorization"] = ` Bearer ${token} `;
    }

 return config;
}