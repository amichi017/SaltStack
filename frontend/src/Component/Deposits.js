
import React from 'react';
import Link from '@material-ui/core/Link';

import SearchIcon from '@material-ui/icons/Search';
import {Typography,Button,Grid} from '@material-ui/core';
import Title from './Title';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker,MuiPickersUtilsProvider,DatePicker} from "@material-ui/pickers";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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





 class Deposits extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChangeStart = this.handleDateChangeStart.bind(this);
    this.handleDateChangeEnd = this.handleDateChangeEnd.bind(this);
    this.state = this.props.date;
  }
  
  handleDateChangeStart(e){
    this.setState({start:e});
    this.props.date[0]=e;
    console.log(this.props.date);
    // this.setState({start: e.target.value});
    
  }
  handleDateChangeEnd (e){
    this.setState({end:e});
    this.props.date[1]=e;
    console.log(this.props.date);
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
      
      <Typography style={{flex: 1,paddingTop:25}}>
      
       
       
        <Button
        variant="outlined" color="primary"
  
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

export default connect(mapStateToProps)(Deposits);