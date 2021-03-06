import axios from 'axios';
import store from '../store'
 import { 
     DATE_SELECT,
     SALT_RETURNS,
     LIST_MINIONS,
     TEAM_LIST,
     GRAPH_DATE_SELECT,
     SALT_RETURNS_GRAPH,
     CURRENT_MONTH,
     //CURRENT_YEAR,
     LAST_THREE_MONTHS_ONE,
     LAST_THREE_MONTHS_TOW,
     LAST_THREE_MONTHS_THREE
    } from './types';
 import data from '../Component/test.json';
 // Date is select
 export const dateSelect = (start , end) => {

     return  {
                 type: DATE_SELECT,
                 payload:{start,end}
              };
     // console.log("start ",start);
     // console.log("end ",end);

 }
 export const grapgDateSelect = (graphDate) => {

    return  {
                type: GRAPH_DATE_SELECT,
                payload:{graphDate}
             };
    // console.log("start ",start);
    // console.log("end ",end);

}
 export const listMinions =  () => (dispatch, getState) => {

    axios.get('/get_connected_minions',tokenConfig(getState))
    .then((res) => {
            let minions=[];
            for(let i=0;i<res.data.result.length;i++){
               let minion={name:res.data.result[i]};
               minions.push(minion);
            }
            //console.log(minions,"minions");   
            store.dispatch({
                type: TEAM_LIST,
                payload: minions
            });
    })
    .catch(err => {
        console.log(err,"err get_connected_minions");

       });
    // console.log("start ",start);
    // console.log("end ",end);

}
export const teamList =  () => (dispatch, getState) => {

    axios.get('/get_users',tokenConfig(getState))
    .then((res) => { 
            store.dispatch({
                type: TEAM_LIST,
                payload: res.data
            });
    })
    .catch(err => {
        console.log(err);

       });
    // console.log("start ",start);
    // console.log("end ",end);

}

 export const saltReturns =  (str) => (dispatch, getState) => {
     //console.log("----------------------storeeeee--------------\n",store)
     const time =new Date().toDateString();
        let MonthStart= String(parseInt(store.getState().date.start.getMonth()+1));
        MonthStart=parseInt(MonthStart)<10?"0"+MonthStart:MonthStart;
        let yearStart=String(store.getState().date.start.getFullYear());
        let DayStart=store.getState().date.start.getDate();
        DayStart=parseInt(DayStart)<10?"0"+DayStart:DayStart;
        let Start=yearStart+String(MonthStart)+String(DayStart)+"000000000000"

        let MonthEnd= String(parseInt(store.getState().date.end.getMonth())+1);
        MonthEnd=parseInt(MonthEnd)<10?"0"+MonthEnd:MonthEnd;
        let yearEnd=String(store.getState().date.end.getFullYear());
        let DayEnd=store.getState().date.end.getDate()
        DayEnd=parseInt(DayEnd)<10?"0"+DayEnd:DayEnd;
        //let End=yearEnd+String(MonthEnd)+String(DayEnd)+"000000000000"
        let End=yearEnd+String(MonthEnd)+String(DayEnd)+"235959595959"
        //  let startYear=new Date(year,Month,store.getState().date.start.getDate());
        //  let endYear=store.getState().date.end;
        //  let index = startYear;
 // if(getState().auth.token !== null){      console.log("ppppppppppppppppp");}
        let minions=[];
// for (let index = startYear; index <= endYear; index.setFullYear(index.getFullYear() + 1)) {
   
     if(str === "CurrentYear"){
        
       
        let year=String(new Date().getFullYear());
        let dayEnd=String(new Date(year, 12, 0).getDate());
        DayEnd=parseInt(DayEnd)<10?"0"+DayEnd:DayEnd;
        Start= year+"0101"+"000000000000";
        End= year+"12"+dayEnd+"235959595959";
     }
     else if(str === "CurrentMonth"){
        
       
        let year=String(new Date().getFullYear());
        let dayEnd=String(new Date(year, new Date().getMonth()+1, 0).getDate());
        DayEnd=parseInt(DayEnd)<10?"0"+DayEnd:DayEnd;
        let satrtCurrentMonth=(new Date().getMonth()+1);
        satrtCurrentMonth=parseInt( satrtCurrentMonth)<10?"0"+ satrtCurrentMonth: satrtCurrentMonth;
        Start= year+satrtCurrentMonth+"01"+"000000000000";
        End= year+satrtCurrentMonth+dayEnd+"235959595959";
     }
     else if(str === "LastThreeMonths"){
        
       
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEnd=String(new Date(year, new Date().getMonth(), 0).getDate());
        DayEnd=parseInt(DayEnd)<10?"0"+DayEnd:DayEnd;
        let satrtMonth=new Date(2020, new Date().getMonth()-2, 1).getMonth();
        satrtMonth=parseInt(satrtMonth)<10?"0"+satrtMonth:satrtMonth;
        let endtLastThreeMonths=String(new Date().getMonth());
        endtLastThreeMonths=parseInt( endtLastThreeMonths)<10?"0"+ endtLastThreeMonths: endtLastThreeMonths;
        Start= year+satrtMonth+"01"+"000000000000";
        End= year+endtLastThreeMonths+dayEnd+"235959595959";
     }
   
     let url='/api/saltReturns/apply/'+Start+"/"+End;
     //console.log("url" ,url);
     axios.get(url, tokenConfig(getState))
    .then((res) => {
        //console.log("pppppppppppppppppppppppppppppppppppppp")
        minions=minions.concat(res.data);
       // console.log(minions);
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
   // }


       //console.log(store.getState(),"the store ");
       //console.log(minions,"minions ");
};


export const saltReturnsForgraph =  (str) => (dispatch, getState) => {
    //console.log("----------------------storeeeee--------------\n",store)
    const time =new Date().toDateString();
       let MonthStart= String(parseInt(store.getState().graphDate.graphDate.getMonth()+1));
       MonthStart=parseInt(MonthStart)<10?"0"+MonthStart:MonthStart;
       let yearStart=String(store.getState().graphDate.graphDate.getFullYear());
       let DayStart=store.getState().graphDate.graphDate.getDate();
       DayStart=parseInt(DayStart)<10?"0"+DayStart:DayStart;
       let Start=yearStart+String(MonthStart)+String(DayStart)+"000000000000"

       let MonthEnd= String(parseInt(store.getState().graphDate.graphDate.getMonth())+1);
       MonthEnd=parseInt(MonthEnd)<10?"0"+MonthEnd:MonthEnd;
       let yearEnd=String(store.getState().graphDate.graphDate.getFullYear());
       let DayEnd=store.getState().graphDate.graphDate.getDate()
       DayEnd=parseInt(DayEnd)<10?"0"+DayEnd:DayEnd;
       //let End=yearEnd+String(MonthEnd)+String(DayEnd)+"000000000000"
       let End=yearEnd+String(MonthEnd)+String(DayEnd)+"235959595959"
       //  let startYear=new Date(year,Month,store.getState().date.start.getDate());
       //  let endYear=store.getState().date.end;
       //  let index = startYear;
// if(getState().auth.token !== null){      console.log("ppppppppppppppppp");}
       let minions=[];
// for (let index = startYear; index <= endYear; index.setFullYear(index.getFullYear() + 1)) {
  
   
    //console.log(Start,"Start")
    //console.log(End,"End")
    let url='/api/saltReturns/apply/'+Start+"/"+End;
    //console.log("url" ,url);
    axios.get(url, tokenConfig(getState))
   .then((res) => {

       minions=minions.concat(res.data);
      // console.log(minions);
     // console.log(minions,"minions")
      /// if(index === endYear){console.log(res,"res ");}
       store.dispatch({
           type: SALT_RETURNS_GRAPH,
           payload: minions
       })
       // console.log(res,"res");
   })
   .catch(err => {
       console.log(err,"error in data");

      });
  // }


      //console.log(store.getState(),"the store ");
      //console.log(minions,"minions ");
};
// Setup config/headers and token
export const tokenConfig = getState => {
   // console.log("getstatteeeeeslatl",getState())
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




