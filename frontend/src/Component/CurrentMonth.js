

import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';
import axios from 'axios'
import { saltReturns } from '../actions/date';
import {connect} from 'react-redux';
const styles = theme => ({
    root: {
      display: 'flex',
    },
});

export const tokenConfig = getState => {
  // console.log("getstatteeeeeslatl",getState())
   // Get token from localstorage
   const token = store.getState().auth.token;

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
class CurrentMonth extends PureComponent {
    constructor(props) {
        super(props);
         this.dataInit = this.dataInit.bind(this);
         store.dispatch(saltReturns("CurrentMonth"));
        this.state = {
            start: new Date(),
            end:new Date(),
            data: this.dataInit(),
            flag:true,
        };
      }
    
      // componentWillUpdate(){
      //   this.setState({data:this.dataInit(),flag:false});
      // }
     
      dataInit(){
        let time_1=new Date().getTime();
        let year=String(new Date().getFullYear());
        let dayEnd=String(new Date(year, new Date().getMonth()+1, 0).getDate());
        dayEnd=parseInt(dayEnd)<10?"0"+dayEnd:dayEnd;
        let satrtCurrentMonth=(new Date().getMonth()+1);
        satrtCurrentMonth=parseInt( satrtCurrentMonth)<10?"0"+ satrtCurrentMonth: satrtCurrentMonth;
        let Start= year+satrtCurrentMonth+"01"+"000000000000";
        let End= year+satrtCurrentMonth+dayEnd+"235959595959";
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
      axios.get(url, tokenConfig(store.getState()))
      .then((res) => {
        let dataInit=[];
        // let temp=new Date(2020,4);
        let temp=new Date();
         let mnonthDay =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
            for (let i=1;i<=mnonthDay;i++){
             dataInit.push( { name: String(i), Fail:0, Success:0 });
         }
        minions=minions.concat(res.data);
       // console.log(res.data,"res.data")
       // console.log(minions,"minions")
        if(minions!==null){
          
          let funSaltReturns=minions
          //.filter((item)=>{return item.full_ret.fun === "state.apply"})
        //   .filter((item)=>{
        //   let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
        //   let time=new Date(str);
        //   if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
        // })
        .forEach((item) => {
            let place= (parseInt(item.jid.slice(6,8))-1);
           // console.log(place,"day");
           let res=true;
           let flag=0;
           //if(item.full_ret.success === false){res=false}
           //let temp =Object.entries(item.return);
           if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
           else{
               //console.log(item,'item');
              // let flag =0;
               let dataTemp=Object.entries(item.return).map((e,index,arr) => {
                 if(e[1].result === false){
                  dataInit[place].Fail++;
                  flag=1;
                  //break;
                 }
                if(index===arr.length-1 && flag === 0){
                  dataInit[place].Success++;
                }
              //  if(flag ===1){
              //   { e[1].result === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}
              //  }
             
              });
              //  let flag=false;
              
            //console.log(Object.entries(item.return),"Object.entries(item.return)");
              //  dataTemp.forEach(item =>{
              //     // console.log(Object.values(item),'Object.values(item)');
              //      if((Object.values(item)[0].result===true)&& (flag===false)){res=true}
              //      else{res=false;flag=true;}
              //  } )
           }
         
          })
          let time_2=new Date().getTime();
          console.log((time_2-time_1),"Time from month");
          }
          
      
        
       //console.log(dataInit,"dataInit");
         
          // for (let i=1;i<=mnonthDay;i++){
          //     dataInit.push( { name: String(i), Fail: i+10*2/(i+1*2), Success: i+5/(i+1)*5 });
          // }
         // console.log(dataInit);
          this.state.data= dataInit;
          this.forceUpdate();
        //console.log("this.state 1",this.state)


    })
    .catch(err => {
        console.log(err,"error in data");

       });
       
       
    //     let mnontStart=new Date(temp.getFullYear(), temp.getMonth());
    // //console.log(mnontStart,"mnontStart");

    //     let mnontEnd=new Date(temp.getFullYear(), temp.getMonth(), mnonthDay);
    //     mnontEnd.setHours(23,59,59);
       // console.log(mnontEnd,"mnontEnd");
        // console.log(mnontStart,"gggggggggggggggggggggg");
        // console.log(mnontEnd,"gggggggggggggggggggggg");
      
      
      }
      
    render() {
     // console.log("this.state 2",this.state)
        return (
          <BarChart
            width={1220}
            height={500}
            data={this.state.data}
            margin={{
              top: 5, right: 20, left: 10, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            <Bar dataKey="Fail" fill="#ff6666"/>
            <Bar dataKey="Success" fill="#82ca9d" />
          </BarChart>
        );
      }
    }
    
    const mapStateToProps = (state, ownProps) => {
      return {
          saltReturns: state.saltReturns,
          date: state.date
      }
  }
    export default connect(mapStateToProps)(withStyles(styles)(CurrentMonth));








// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/mc8r7e6p/';

>>>>>>> f7b6b1be5afdfc635c9535a61c4215ff5157700a
