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
import { saltReturns } from '../actions/date';
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





 class Deposits extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChangeStart = this.handleDateChangeStart.bind(this);
    this.handleDateChangeEnd = this.handleDateChangeEnd.bind(this);
    this.dateIsChanged = this.dateIsChanged.bind(this);
  
    this.state={start:this.props.date.start , end:this.props.date.end ,date:null};
  
  }
//   shouldComponentUpdate(nextProps, nextState) {
//   return this.state.value != nextState.value;
// }
  handleDateChangeStart(date){
    this.setState({booleanStart:true,start:date});
  }
    
  
  handleDateChangeEnd (date){
   this.setState({booleanEnd:true,end:date});
  }
 
  dateIsChanged(){
      let start=this.state.start;
      let end=this.state.end;
     
      store.dispatch({
        type: DATE_SELECT,
        payload: {start:start,end:end}
       } );
       store.dispatch(saltReturns());


      // console.log("store",store.getState());
  }
 
  //onChange = date => this.setState({ date })
 
  render () {
    return (
      <React.Fragment style={{marginTop:-5}}>
        <Typography  variant="h4" >

          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Grid container justify="space-around">
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Table Start Date"
            format="dd/MM/yyyy"
            value={this.state.start}
            onChange={(date)=>{this.handleDateChangeStart(date)}}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Table End Date"
          format="dd/MM/yyyy"
          value={this.state.end}
          onChange={(date)=>{this.handleDateChangeEnd(date)}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      
      <Typography style={{flex: 1,paddingTop:12}}>
      
       
       
        <Button
        variant="outlined" color="primary"
        onClick={this.dateIsChanged}
        endIcon={ <SearchIcon>Search</SearchIcon>}
      >
      Search
      </Button>
      </Typography>
            </Grid>
          </MuiPickersUtilsProvider>

        </Typography>
       
      </React.Fragment>
    );
  }
    
}

 const mapStateToProps = (state, ownProps) => {
  return {
    date: state.date
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({dateSelect: dateSelect}, dispatch);
}

export default connect(mapStateToProps)(Deposits);