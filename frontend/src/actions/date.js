import axios from 'axios';
import store from '../store'
 import { DATE_SELECT, SALT_RETURNS,SAVE_MINION} from './types';
 // Date is select
 export const dateSelect = (start , end) => {

     return  {
                 type: DATE_SELECT,
                 payload:{start,end}
              };
     // console.log("start ",start);
     // console.log("end ",end);

 }


//  // Clear date
//   export const saltReturns =  () => (dispatch, getState) => {

//     const time =new Date().toDateString();
//     let Month= String(parseInt(store.getState().date.start.getMonth()));
//     Month=parseInt(Month)<10?"0"+Month:Month;
//     let year=String(store.getState().date.start.getFullYear());


//     let startYear=new Date(year,Month,store.getState().date.start.getDate());
//     let endYear=store.getState().date.end;

//     console.log(startYear,"startYear");
//     console.log(endYear,"endYear");


//  if(store.getState().auth.token !== null){   }  // console.log("ppppppppppppppppp");}

//    let data=[];

// //  for (let index = startYear; index <= endYear; index.setFullYear(index.getFullYear() + 1)) {
//     let index = startYear
//     let url='http://127.0.0.1:5000/api/saltReturns/apply/'+index.getFullYear();
//     console.log("url" ,url);
//     axios.get(url, tokenConfig(getState))
//     .then((res) => {
//         console.log("res.data" ,res.data);
//         store.dispatch({
//             type: SALT_RETURNS,
//             payload: res.data
//         })

//     })
//     .catch(err => {
//         console.log(err,"error in data");

//        });
//  //}

// console.log(store.getState(),"the store from date ");
// };
 //Clear date
 export const saltReturns =  () => (dispatch, getState) => {
     console.log("----------------------storeeeee--------------\n",store)
     const time =new Date().toDateString();
     let Month= String(parseInt(store.getState().date.start.getMonth()));
         Month=parseInt(Month)<10?"0"+Month:Month;
         let year=String(store.getState().date.start.getFullYear());


         let startYear=new Date(year,Month,store.getState().date.start.getDate());
         let endYear=store.getState().date.end;
         let index = startYear;
 // if(getState().auth.token !== null){      console.log("ppppppppppppppppp");}
        let minions=[];
 for (let index = startYear; index <= endYear; index.setFullYear(index.getFullYear() + 1)) {

     let url='http://127.0.0.1:5000/api/saltReturns/apply/'+index.getFullYear();
     console.log("url" ,url);
     axios.get(url, tokenConfig(getState))
    .then((res) => {

        minions=minions.concat(res.data);
       /// if(index === endYear){console.log(res,"res ");}
        store.dispatch({
            type: SALT_RETURNS,
            payload: minions
        })
        // console.log(res,"res");
    })
    .catch(err => {
        console.log(err,"error in data");

       });
    }


       console.log(store.getState(),"the store ");
       console.log(minions,"minions ");
};



// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }

    // If token, add to headers
    if(token) {
       config.headers["Authorization"] = ` Bearer ${token} `;
    }

 return config;
}




// export const saltReturns =  () => (dispatch, getState) => {

//     const time =new Date().toDateString();

// // if(getState().auth.token !== null){      console.log("ppppppppppppppppp");}
//     axios.get('http://127.0.0.1:5000/api/saltReturns/apply/2020', tokenConfig(getState))
//    .then((res) => {

//        // console.log(res,"res");
//    store.dispatch({
//        type: SALT_RETURNS,
//        payload: res.data
//    })})
//    .catch(err => {
//        console.log(err,"error in data");

//       });

//       console.log(store.getState(),"the store ");
// };
