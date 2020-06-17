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
import { saltReturns } from '../actions/date';
import { Store } from '@material-ui/icons';
// import SaltData from'../demo/jsonPars.json';
// Generate Sales Data


const time =(str)=>{
  const year =str.slice(0,4);
  const month =String(parseInt(str.slice(4,6)));
  const day =str.slice(6,8);
  const hower= str.slice(8,10);
  //console.log(month,'montg from graph');
  const minet=str.slice(10,12);
  return String(hower)+":"+String(minet);

}
function createData(time,Success,Fail, amount) {
  return { time,Success,Fail, amount };
}

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
const demoOnClick= (e)=>{
  // if(e){if(e.activeLabel){console.log(e.activeLabel);}}
};
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



 class Chart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.InitData=this.InitData.bind(this);
    this.state = {
      start: new Date(),
      end:new Date(),
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
}
InitData(){
  let temp=[
    { time:"00:00",Succeeded:0,Fail:0, amount:0 },
    { time:"03:00",Succeeded:0,Fail:0, amount:0 },
    { time:"06:00",Succeeded:0,Fail:0, amount:0 },
    { time:"09:00",Succeeded:0,Fail:0, amount:0 },
    { time:"12:00",Succeeded:0,Fail:0, amount:0 },
    { time:"15:00",Succeeded:0,Fail:0, amount:0 },
    { time:"18:00",Succeeded:0,Fail:0, amount:0 },
    { time:"21:00",Succeeded:0,Fail:0, amount:0 },
    { time:"24:00",Succeeded:0,Fail:0, amount:0 },
  ];
  return temp;
}
  componentWillReceiveProps(nextProps) {
    if( (((this.props.date.start.toLocaleDateString()!== nextProps.date.start.toLocaleDateString()) || (this.props.date.end.toLocaleDateString()!== nextProps.date.end.toLocaleDateString() )))){
      this.setState({start:nextProps.date.start,end:nextProps.date.end});
      const start=store.getState().date.start;
      const end=store.getState().date.end;
      let tempArray=[
        { time:"00:00",Succeeded:0,Fail:0, amount:0 },
        { time:"03:00",Succeeded:0,Fail:0, amount:0 },
        { time:"06:00",Succeeded:0,Fail:0, amount:0 },
        { time:"09:00",Succeeded:0,Fail:0, amount:0 },
        { time:"12:00",Succeeded:0,Fail:0, amount:0 },
        { time:"15:00",Succeeded:0,Fail:0, amount:0 },
        { time:"18:00",Succeeded:0,Fail:0, amount:0 },
        { time:"21:00",Succeeded:0,Fail:0, amount:0 },
        { time:"24:00",Succeeded:0,Fail:0, amount:0 },
      ];
      if(nextProps.saltReturns.saltReturns!==null)
      {
        //console.log(nextProps.saltReturns.saltReturns,'data from graph conponent')
      
       nextProps.saltReturns.saltReturns
       .filter((item)=>{return item.full_ret.fun === "state.apply"})
       .filter((item)=>{
          let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
          //let time=new Date(str);
          // if(time >= start && time<= end){return item;}
          let time=new Date(str);
          let startTemp=new Date(end.getTime());
          let endTemp=new Date(end.getTime());
          startTemp.setHours(0,0,0);
          endTemp.setHours(23,59,59);
          if(((time.getTime() >=startTemp.getTime()))  && (time.getTime() <=endTemp.getTime())){return item;}
        })
        .forEach(item => {
          let res=true;
          if(item.full_ret.success === false){res=false}
         // let temp =Object.entries(item.return);
          if(Array.isArray(item.full_ret.return)){ res=true}
          else{
              console.log(item,'item');
              let dataTemp=Object.entries(item.return).map((e) => ( { [e[0]]: e[1] } ));
              let flag=false;
              dataTemp.forEach(item =>{
                  console.log(Object.values(item),'Object.values(item)');
                  if((Object.values(item)[0].result===true)&& (flag===false)){res=true}
                  else{res=false;flag=true;}
              } )
          }
        if(parseNumber(item.full_ret.jid)==="03:00")
        { res === true ?(tempArray[1].Success++):(tempArray[1].Fail++)};
        if(parseNumber(item.full_ret.jid)==="06:00")
        { res === true ?(tempArray[2].Success++):(tempArray[2].Fail++)};
        if(parseNumber(item.full_ret.jid)==="09:00")
        { res === true ?(tempArray[3].Success++):(tempArray[3].Fail++)};
        if(parseNumber(item.full_ret.jid)==="12:00")
        { res === true ?(tempArray[4].Success++):(tempArray[4].Fail++)};
        if(parseNumber(item.full_ret.jid)==="15:00")
        { res === true ?(tempArray[5].Success++):(tempArray[5].Fail++)};
        if(parseNumber(item.full_ret.jid)==="18:00")
        { res === true ?(tempArray[6].Success++):(tempArray[6].Fail++)};
        if(parseNumber(item.full_ret.jid)==="21:00")
        { res === true ?(tempArray[7].Success++):(tempArray[7].Fail++)};
        if(parseNumber(item.full_ret.jid)==="24:00")
        { res === true ?(tempArray[8].Success++):(tempArray[8].Fail++)};
       
        
        });
      }
        this.state.data=tempArray;

        //console.log(this.state.data,"this.state.data                             ");
      //  console.log("state                               ",store.getState());
    }
    
      const startTemp=store.getState().date.start;
      const endTemp=store.getState().date.end;
      if((startTemp.getTime()> endTemp.getTime())){
      let temp=[
        { time:"00:00",Succeeded:0,Fail:0, amount:0 },
        { time:"03:00",Succeeded:0,Fail:0, amount:0 },
        { time:"06:00",Succeeded:0,Fail:0, amount:0 },
        { time:"09:00",Succeeded:0,Fail:0, amount:0 },
        { time:"12:00",Succeeded:0,Fail:0, amount:0 },
        { time:"15:00",Succeeded:0,Fail:0, amount:0 },
        { time:"18:00",Succeeded:0,Fail:0, amount:0 },
        { time:"21:00",Succeeded:0,Fail:0, amount:0 },
        { time:"24:00",Succeeded:0,Fail:0, amount:0 },
      ];
      this.state.data=temp;
    }
  }
  componentWillUpdate() {
    const start=store.getState().date.start;
    const end=store.getState().date.end;
   // console.log(store.getState());
    // while (store.getState().saltReturns.saltReturns === null) {  }
   let temp=  
   [{ time:"00:00",Success:0,Fail:0, amount:0 },
   { time:"03:00",Success:0,Fail:0, amount:0 },
   { time:"06:00",Success:0,Fail:0, amount:0 },
   { time:"09:00",Success:0,Fail:0, amount:0 },
   { time:"12:00",Success:0,Fail:0, amount:0 },
   { time:"15:00",Success:0,Fail:0, amount:0 },
   { time:"18:00",Success:0,Fail:0, amount:0 },
   { time:"21:00",Success:0,Fail:0, amount:0 },
   { time:"24:00",Success:0,Fail:0, amount:0 },];

   if( store.getState().saltReturns.saltReturns!==null)
   {
    store.getState().saltReturns.saltReturns
    .filter((item)=>{return item.full_ret.fun === "state.apply"})
    .filter((item)=>{
    let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
    // let time=new Date(str);
    // // if(time >= start && time<= end){return item;}
    
    let time=new Date(str);
    let startTemp=new Date(end.getTime());
    let endTemp=new Date(end.getTime());
    startTemp.setHours(0,0,0);
    endTemp.setHours(23,59,59);
    if(((time.getTime() >=startTemp.getTime()))  && (time.getTime() <=endTemp.getTime())){return item;}
  })
  .forEach(item => {
    let res=true;
    if(item.full_ret.success === false){res=false}
    //let temp =Object.entries(item.return);
    if(Array.isArray(item.full_ret.return)){ res=true}
    else{
        console.log(item,'item');
        let dataTemp=Object.entries(item.return).map((e) => ( { [e[0]]: e[1] } ));
        let flag=false;
        dataTemp.forEach(item =>{
            console.log(Object.values(item),'Object.values(item)');
            if((Object.values(item)[0].result===true)&& (flag===false)){res=true}
            else{res=false;flag=true;}
        } )
    }
  if(parseNumber(item.full_ret.jid)==="03:00")
  { res === true ?(temp[1].Success++):(temp[1].Fail++)};
  if(parseNumber(item.full_ret.jid)==="06:00")
  { res === true ?(temp[2].Success++):(temp[2].Fail++)};
  if(parseNumber(item.full_ret.jid)==="09:00")
  { res === true ?(temp[3].Success++):(temp[3].Fail++)};
  if(parseNumber(item.full_ret.jid)==="12:00")
  { res === true ?(temp[4].Success++):(temp[4].Fail++)};
  if(parseNumber(item.full_ret.jid)==="15:00")
  { res === true ?(temp[5].Success++):(temp[5].Fail++)};
  if(parseNumber(item.full_ret.jid)==="18:00")
  { res === true ?(temp[6].Success++):(temp[6].Fail++)};
  if(parseNumber(item.full_ret.jid)==="21:00")
  { res === true ?(temp[7].Success++):(temp[7].Fail++)};
  if(parseNumber(item.full_ret.jid)==="24:00")
  { res === true ?(temp[8].Success++):(temp[8].Fail++)};
  });
  
  }
  this.state.data= temp;
  //console.log(this.state.data,"this.state.data                             ");
  const startTemp=store.getState().date.start;
  const endTemp=store.getState().date.end;
  if((startTemp.getTime()> endTemp.getTime())){
  let temp=[
    { time:"00:00",Succeeded:0,Fail:0, amount:0 },
    { time:"03:00",Succeeded:0,Fail:0, amount:0 },
    { time:"06:00",Succeeded:0,Fail:0, amount:0 },
    { time:"09:00",Succeeded:0,Fail:0, amount:0 },
    { time:"12:00",Succeeded:0,Fail:0, amount:0 },
    { time:"15:00",Succeeded:0,Fail:0, amount:0 },
    { time:"18:00",Succeeded:0,Fail:0, amount:0 },
    { time:"21:00",Succeeded:0,Fail:0, amount:0 },
    { time:"24:00",Succeeded:0,Fail:0, amount:0 },
  ];
  this.state.data=temp;
}
}
  render(){
  return (
    <React.Fragment>
      {/*<Title style={{paddingLeft:5}}>{(this.state.start.toLocaleDateString() === this.state.end.toLocaleDateString())?this.state.start.toLocaleDateString():this.state.start.toLocaleDateString() + ' - '+ this.state.end.toLocaleDateString()}</Title>*/}
       {<Title style={{paddingLeft:5}}> {this.state.end.toLocaleDateString()}</Title>}
      <ResponsiveContainer>
          <LineChart
            onClick={demoOnClick}
            data={ this.state.data}
            margin={{top: 16,right: 16,bottom: 0,left: 24,}}>
          <XAxis dataKey="time" /><YAxis >{/* <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>(A/T)</Label>*/ }   
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Fail" stroke="#ff6666" onClick={demoOnClick} />
          <Line type="monotone" dataKey="Success" stroke="#82ca9d"  onClick={demoOnClick}/>
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
 }
}

const mapStateToProps = (state) => {
  return {
    saltReturns: state.saltReturns,
    date: state.date 
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({dateSelect: dateSelect}, dispatch);
}
export default connect(mapStateToProps)(Chart);