import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {dateSelect} from '../actions/date';
import { LineChart,
         Line,
         XAxis,
         YAxis,
         Label,
         ResponsiveContainer,
         Tooltip,
         Legend,
         CartesianGrid  
} from 'recharts';
import store from '../store';
import Title from './Title';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";
import { saltReturnsForgraph } from '../actions/date';
import { Store } from '@material-ui/icons';
import axios from 'axios';


const time =(str)=>{
  const year =str.slice(0,4);
  const month =String(parseInt(str.slice(4,6)));
  const day =str.slice(6,8);
  const hower= str.slice(8,10);

  const minet=str.slice(10,12);
  return String(hower)+":"+String(minet);

}
function createData(time,Success,Fail, amount) {
  return { time,Success,Fail, amount };
}
const demoOnClick= (e)=>{
  // if(e){if(e.activeLabel){console.log(e.activeLabel);}}
};
const INIT_DATA = [
  createData('00:00',0,0, 0),
  createData('03:00',0,0, 0),
  createData('06:00',0,0, 0),
  createData('09:00',0,0, 0),
  createData('12:00',0,0, 0),
  createData('15:00',0,0, 0),
  createData('18:00',0,0, 0),
  createData('21:00',0,0, 0),
  createData('24:00',0,0, 0),
];

const parseNumber= (str)=>{
  let hower= parseInt(str.slice(8,10));
  if(hower<=3){return "03:00"};
  if(hower<=6){return "06:00"};
  if(hower<=9){return "09:00"};
  if(hower<=12){return "12:00"};
  if(hower<=15){return "15:00"};
  if(hower<=18){return "18:00"};
  if(hower<=21){return "21:00"};
  if(hower<=24){return "24:00"};
  return "00:00";
 
};
 const tokenConfig = getState => {
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

const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(50),
    marginTop:theme.spacing(11),
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
});

 class Chart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.dataInit = this.dataInit.bind(this);
    this.state = {
      graphDate: new Date(),
      flag:true,
      minions:null,
      graphIsPrepared:true,
      data:  [{ time:"00:00",Success:0,Fail:0, amount:0 },
              { time:"03:00",Success:0,Fail:0, amount:0 },
              { time:"06:00",Success:0,Fail:0, amount:0 },
              { time:"09:00",Success:0,Fail:0, amount:0 },
              { time:"12:00",Success:0,Fail:0, amount:0 },
              { time:"15:00",Success:0,Fail:0, amount:0 },
              { time:"18:00",Success:0,Fail:0, amount:0 },
              { time:"21:00",Success:0,Fail:0, amount:0 },
              { time:"24:00",Success:0,Fail:0, amount:0 },]
  };
  this.dataInit();
}
dataInit(){
  
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
axios.get(url, tokenConfig(store.getState()))
.then((res) => {
  let tempArray=[
    { time:"00:00",Success:0,Fail:0, amount:0 },
    { time:"03:00",Success:0,Fail:0, amount:0 },
    { time:"06:00",Success:0,Fail:0, amount:0 },
    { time:"09:00",Success:0,Fail:0, amount:0 },
    { time:"12:00",Success:0,Fail:0, amount:0 },
    { time:"15:00",Success:0,Fail:0, amount:0 },
    { time:"18:00",Success:0,Fail:0, amount:0 },
    { time:"21:00",Success:0,Fail:0, amount:0 },
    { time:"24:00",Success:0,Fail:0, amount:0 },
  ];
  minions=minions.concat(res.data);
 //console.log(minions,"minions");
// console.log(minions,"minions")
 /// if(index === endYear){console.log(res,"res ");}
  this.state.minions=minions;
  //console.log( this.state.minions," this.state.minions");
  if(this.state.minions!==null)
  {
        // let MonthEnd= String(parseInt(store.getState().date.end.getMonth())+1);
        // MonthEnd=parseInt(MonthEnd)<10?"0"+MonthEnd:MonthEnd;
        // let yearEnd=String(store.getState().date.end.getFullYear());
        // let DayEnd=store.getState().date.end.getDate()
        // DayEnd=parseInt(DayEnd)<10?"0"+DayEnd:DayEnd;
        // let EndStart=parseInt(yearEnd+String(MonthEnd)+String(DayEnd)+"000000000000");

        // let End=parseInt(yearEnd+String(MonthEnd)+String(DayEnd)+"235959595959")
  
      this.state.minions
    
      //  .filter((item)=>{
    
      //     if(parseInt(item.jid)>=EndStart && parseInt(item.jid)<=End){return item}
      //   })
        .forEach(item => {
          let res=true;
          let flag=0;
         
          if(Array.isArray(item.return)){ res=true;}
          else{
           
              let dataTemp=Object.entries(item.return).map((e,index,arr) => {
               if((e[1].result === false) && (flag===0)){
                  res=false
                 flag=1;
              
                }
               if(index===arr.length-1 && flag === 0){
                  flag=1;
                  res=true;
                
               
               }
          
            
             });
     
          }
        if(parseNumber(item.jid)==="03:00")
        { res === true ?(tempArray[1].Success++):(tempArray[1].Fail++)};
        if(parseNumber(item.jid)==="06:00")
        { res === true ?(tempArray[2].Success++):(tempArray[2].Fail++)};
        if(parseNumber(item.jid)==="09:00")
        { res === true ?(tempArray[3].Success++):(tempArray[3].Fail++)};
        if(parseNumber(item.jid)==="12:00")
        { res === true ?(tempArray[4].Success++):(tempArray[4].Fail++)};
        if(parseNumber(item.jid)==="15:00")
        { res === true ?(tempArray[5].Success++):(tempArray[5].Fail++)};
        if(parseNumber(item.jid)==="18:00")
        { res === true ?(tempArray[6].Success++):(tempArray[6].Fail++)};
        if(parseNumber(item.jid)==="21:00")
        { res === true ?(tempArray[7].Success++):(tempArray[7].Fail++);};
        if(parseNumber(item.jid)==="24:00")
        { res === true ?(tempArray[8].Success++):(tempArray[8].Fail++)};
      
        
        });
    }
    //console.log(tempArray,"tempArray")
    this.state.data=tempArray;
    this.setState({data:tempArray,graphIsPrepared:true})
   // console.log(this.state.data,"this.state.data")
   this.forceUpdate();
}
)
.catch(err => {
  console.log(err,"error in data");

 });
// }
}

  componentWillReceiveProps(nextProps) {
    this.dataInit();
    
}
  
// shouldComponentUpdate(nextState){
// console.log('shouldComponentUpdate',this.state.flag)
//   if(this.state.flag===true){
//     this.state.data=nextState.data;
//     this.state.flag=false;
  
//     return false;
//   }
//   this.state.flag=true;
//   return true;
// }  



 
  render(){
   // console.log("render");
    //console.log(this.state,"this.state");
   // console.log(this.state.graphIsPrepared,"pppppppppppppppp")
    if(this.state.graphIsPrepared===true){
      return(
        <React.Fragment>
        {/*<Title style={{paddingLeft:5}}>{(this.state.start.toLocaleDateString() === this.state.end.toLocaleDateString())?this.state.start.toLocaleDateString():this.state.start.toLocaleDateString() + ' - '+ this.state.end.toLocaleDateString()}</Title>*/}
         {<Title style={{paddingLeft:5}}> {store.getState().graphDate.graphDate.toLocaleDateString()}</Title>}
        <ResponsiveContainer>
            <LineChart
              onClick={demoOnClick}
              data={ this.state.data}
              margin={{top: 16,right: 16,bottom: 0,left: 24,}}>
            <XAxis dataKey="time" /><YAxis >{/* <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>(A/T)</Label>*/ }   
            </YAxis>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Success" stroke="#82ca9d" onClick={demoOnClick}/>
            <Line type="monotone" dataKey="Fail" stroke="#ff6666" onClick={demoOnClick} />
           
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
      )
    }
 else{
   return(
        <div className={this.props.classes.root}>
        <CircularProgress />
        </div>
   )
 }
   
    
 }
}

const mapStateToProps = (state) => {
  return {
    saltReturnsGraph: state.saltReturnsGraph,
    graphDate: state.graphDate 
  }
}



export default connect(mapStateToProps)(withStyles(styles)(Chart));