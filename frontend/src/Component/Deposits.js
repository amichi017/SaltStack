
import React from 'react';
import Link from '@material-ui/core/Link';

import SearchIcon from '@material-ui/icons/Search';
import {Typography,Button,Grid} from '@material-ui/core';
import Title from './Title';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker,MuiPickersUtilsProvider,DatePicker} from "@material-ui/pickers";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
//import DateTime from 'react-datetime';

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





export default class Deposits extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChangeStart = this.handleDateChangeStart.bind(this);
    this.handleDateChangeEnd = this.handleDateChangeEnd.bind(this);
    this.state = {start:new Date(),end:new Date()};
  }
  
  handleDateChangeStart= (e)=>{
    console.log(e)
    // this.setState({start: e.target.value});
    
  }
  handleDateChangeEnd= (e)=>{
    console.log(e)
    // this.setState({end: e.target.value});
  
  }
 
  
 
  //onChange = date => this.setState({ date })
 
  render () {
    return (
      <React.Fragment>
        <Typography component="p" variant="h4">

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Start Date"
            format="dd/MM/yyyy"
            value={this.state.start}
            onChange={this.handleDateChangeStart}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="End Date"
          format="dd/MM/yyyy"
          value={this.state.end}
          onChange={this.handleDateChangeEnd}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      
      <Typography style={{flex: 1,paddingTop:15}}>
      
       
       
        <Button
        variant="contained"
        color="primary"
  
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