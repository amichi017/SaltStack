import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { LineChart,
         Line,
         XAxis,
         YAxis,
         Label,
         ResponsiveContainer,
         Tooltip,
         Legend  
} from 'recharts';
import Title from './Title';

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
    console.log(this.props.date[0].start,'jjjjjjjjjjjjjjjjjjjjjjj');
    this.titleDate= this.props.date[0].start.toLocaleDateString() === this.props.date[1].end.toLocaleDateString() ?( this.props.date[0].start.toLocaleDateString() ): (this.props.date[0].start.toLocaleDateString() + ' - '+ this.props.date[1].end.toLocaleDateString());
    this.state = {
      activeIndex: null
    }
  }
 
  render(){
  return (
    <React.Fragment>
      <Title>{this.titleDate}</Title>
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

const mapStateToProps = (state, ownProps) => {
  return {
    date: state.date
  }
}

export default connect(mapStateToProps)(Chart);