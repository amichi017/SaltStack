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
         Legend  
} from 'recharts';
import store from '../store';
import Title from './Title';
// import SaltData from'../demo/jsonPars.json';
// Generate Sales Data


const time =(str)=>{
  const year =str.slice(0,4);
  const month =String(parseInt(str.slice(4,6))-1);
  const day =str.slice(6,8);
  const hower= str.slice(8,10);
  
  const minet=str.slice(10,12);
  return String(hower)+":"+String(minet);

}
function createData(time,Succeeded,Faile, amount) {
  return { time,Succeeded,Faile, amount };
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
   
    this.state = {
      start: new Date(),
      end:new Date(),
      data:[
        createData('00:00',54,67, 0),
        createData('03:00',67,89, 300),
        createData('06:00',45,67, 600),
        createData('09:00',34,56, 800),
        createData('12:00',23,45, 1500),
        createData('15:00',89,45, 2000),
        createData('18:00',34,56, 2400),
        createData('21:00',23,47, 2400),
        createData('24:00',34,56, 45),
      ]
  };
}
  componentWillReceiveProps(nextProps) {
    if( (((this.props.date.start.toLocaleDateString()!== nextProps.date.start.toLocaleDateString()) || (this.props.date.end.toLocaleDateString()!== nextProps.date.end.toLocaleDateString() )))){
      this.setState({start:nextProps.date.start,end:nextProps.date.end});
      const start=store.getState().date.start;
      const end=store.getState().date.end;
      let temp=[
        { time:"00:00",Succeeded:0,Faile:0, amount:0 },
        { time:"03:00",Succeeded:0,Faile:0, amount:0 },
        { time:"06:00",Succeeded:0,Faile:0, amount:0 },
        { time:"09:00",Succeeded:0,Faile:0, amount:0 },
        { time:"12:00",Succeeded:0,Faile:0, amount:0 },
        { time:"15:00",Succeeded:0,Faile:0, amount:0 },
        { time:"18:00",Succeeded:0,Faile:0, amount:0 },
        { time:"21:00",Succeeded:0,Faile:0, amount:0 },
        { time:"24:00",Succeeded:0,Faile:0, amount:0 },
      ];
       nextProps.saltReturns.saltReturns.filter((item)=>{
          let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
          let time=new Date(str);
          if(time >= start && time<= end){return item;}
        }).forEach(item => {
        if(parseNumber(item.full_ret.jid)==="03:00")
        { item.full_ret.success === true ?(temp[1].Succeeded++):(temp[1].Faile++)};
        if(parseNumber(item.full_ret.jid)==="06:00")
        { item.full_ret.success === true ?(temp[2].Succeeded++):(temp[2].Faile++)};
        if(parseNumber(item.full_ret.jid)==="09:00")
        { item.full_ret.success === true ?(temp[3].Succeeded++):(temp[3].Faile++)};
        if(parseNumber(item.full_ret.jid)==="12:00")
        { item.full_ret.success === true ?(temp[4].Succeeded++):(temp[4].Faile++)};
        if(parseNumber(item.full_ret.jid)==="15:00")
        { item.full_ret.success === true ?(temp[5].Succeeded++):(temp[5].Faile++)};
        if(parseNumber(item.full_ret.jid)==="18:00")
        { item.full_ret.success === true ?(temp[6].Succeeded++):(temp[6].Faile++)};
        if(parseNumber(item.full_ret.jid)==="21:00")
        { item.full_ret.success === true ?(temp[7].Succeeded++):(temp[7].Faile++)};
        if(parseNumber(item.full_ret.jid)==="24:00")
        { item.full_ret.success === true ?(temp[8].Succeeded++):(temp[8].Faile++)};
       
        
        });
        this.state.data=temp;
        console.log("this.state.data                             ",this.state.data);
      //  console.log("state                               ",store.getState());
    }
  }

  
  render(){
  return (
    <React.Fragment>
      <Title>{(this.state.start.toLocaleDateString() === this.state.end.toLocaleDateString())?this.state.start.toLocaleDateString():this.state.start.toLocaleDateString() + ' - '+ this.state.end.toLocaleDateString()}</Title>
      <ResponsiveContainer>
        <LineChart
          onClick={demoOnClick}
          data={this.state.data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time">
          </XAxis> 
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
             (A/T)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="Faile" stroke="#ff6666" onClick={demoOnClick} />
          <Line type="monotone" dataKey="Succeeded" stroke="#82ca9d"  onClick={demoOnClick}/>
          <Legend />
          <Tooltip />
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