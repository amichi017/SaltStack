import React from 'react';
import Link from '@material-ui/core/Link';
import {DATE_SELECT} from "../actions/types";
import SearchIcon from '@material-ui/icons/Search';
import {Typography,Button,Grid} from '@material-ui/core';
import Title from './Title';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker,MuiPickersUtilsProvider,DatePicker} from "@material-ui/pickers";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
//import DateTime from 'react-datetime';
import {dateSelect} from '../actions/date.js';
import store from '../store';
import { saltReturnsForgraph } from '../actions/date';
import graphDate from '../reducers/graphDate';
import {GRAPH_DATE_SELECT} from "../actions/types";
// <DatePicker
// disableFuture
// openTo="year"
// id="date-picker-dialog"
// margin="normal"
// format="dd/MM/yyyy"
// label="Start"
// views={["year", "month", "date"]}
// KeyboardButtonProps={{
//   'aria-label': 'change date',
// }}

// />





 class SearchTimeGraph extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.dateIsChanged = this.dateIsChanged.bind(this);
    this.state={graphDate:this.props.graphDate.graphDate,};
  
  }
//   shouldComponentUpdate(nextProps, nextState) {
//   return this.state.value != nextState.value;
// }
  
    
  
  handleDateChange (date){
    this.setState({graphDate:date});
  
  //  console.log(this.state,'this.state');
  //  console.log(store.getState(),'store');
   store.dispatch(saltReturnsForgraph());
   setTimeout(() => {
    store.dispatch({
      type: GRAPH_DATE_SELECT,
      payload: {graphDate:date}
     } );
   }, 0);
  
  }
 

  dateIsChanged(){
    //this.setState({graphDate:date});
  //   let date=this.state.graphDate;
  //  store.dispatch({
  //   type: GRAPH_DATE_SELECT,
  //   payload: {graphDate:date}
  //  } );
  //  store.dispatch(saltReturnsForgraph());


    // console.log("store",store.getState());
}
 
 
  render () {
    return (
      <React.Fragment>
        <Typography component="p" variant="h4">

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Graph Date"
            format="dd/MM/yyyy"
            value={this.state.graphDate}
            onChange={(date)=>{this.handleDateChange(date)}}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />


        
   
            </Grid>
          </MuiPickersUtilsProvider>

        </Typography>
       
      </React.Fragment>
    );
  }
    
}

 const mapStateToProps = (state, ownProps) => {
  return {
    graphDate: state.graphDate
  }
}

export default connect(mapStateToProps)(SearchTimeGraph);