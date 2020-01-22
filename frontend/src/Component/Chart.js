import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {dateSelect} from '../Actions/date';
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
function createData(time,Succeeded,Faile, amount) {
  return { time,Succeeded,Faile, amount };
}

const data = [
  createData('00:00',54,67, 0),
  createData('03:00',67,89, 300),
  createData('06:00',45,67, 600),
  createData('09:00',34,56, 800),
  createData('12:00',23,45, 1500),
  createData('15:00',89,45, 2000),
  createData('18:00',34,56, 2400),
  createData('21:00',23,47, 2400),
  createData('24:00',34,56, 45),
];
const demoOnClick= (e)=>{
  if(e){if(e.activeLabel){console.log(e.activeLabel);}}
}


 class Chart extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      start: new Date(),
      end:new Date()
    };
  }
  componentWillReceiveProps(nextProps) {
  
  
    if((this.props.date.start.toLocaleDateString()!== nextProps.date.start.toLocaleDateString()) || this.props.date.end.toLocaleDateString()!== nextProps.date.end.toLocaleDateString() ){ 
      this.setState({start:nextProps.date.start,end:nextProps.date.end});
      console.log("props                             ",this.props);
      console.log("state                               ",this.state);
      return true;
    }
 
    return false;
  }
 
  render(){
  return (
    <React.Fragment>
      <Title>{this.state.start.toLocaleDateString() + ' - '+ this.state.end.toLocaleDateString()}</Title>
      <ResponsiveContainer>
        <LineChart
          onClick={demoOnClick}
          data={data}
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
    date: state.date 
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({dateSelect: dateSelect}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Chart);