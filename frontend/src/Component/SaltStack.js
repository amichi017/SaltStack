

import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,


}from '@material-ui/icons';
import { withAlert } from 'react-alert';
import { Alert, AlertTitle } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import MinionCard from './MinionCard';

import Grid from '@material-ui/core/Grid';




const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) =>  <Edit {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const styles = theme => ({
    MaterialTable:{
        marginLeft: theme.spacing(70),
        marginTop: 0,
        width:450,
      
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 500,
      height:70,
      marginTop: theme.spacing(-53)
    },
   
    input: {
      marginLeft: theme.spacing(1),
      marginTop: 0,

      flex: 1,
    },
    minionStyle:{
        marginTop:20,
        width:200
    },
    iconButton: {
      padding: 10,
      height:55
    },
    Divider: {
        marginTop: theme.spacing(5),
      height: 28,
      margin: 20,
    },
    msg:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    
  });



 

class SaltStack extends React.Component {
    constructor(props) {
        super(props);
        this.clickOpen = this.clickOpen.bind(this);
         this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state={alert:false,msg:false,menu:"Dashboard",open: false,
        defer: false,clickSave:false };
    }
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({msg:false});
      };
       handleClick = () => {
        this.setState({msg:true});
        setTimeout(()=>{this.setState({msg:false,clickSave:false});}, 2200);
      };
   
     clickOpen (){
        
        this.setState({alert:true,clickSave:true,clickSave:true});
    
        setTimeout(()=>{this.setState({alert:false,});}, 2200);
        
    }
  render(){
    return (
        <div >



        <div className={this.props.classes.MaterialTable}>
        {
            this.state.alert? 
            (<Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The minions you selected were  — <strong>accepted in the system</strong>
            </Alert>)
            :<div></div>

            }
        <MaterialTable
    
        title='minions'
        icons={tableIcons}
        columns={[
        { title: 'Name', field: 'name' },
        ]}
        data={[
        { name: 'Mehmet' },
        { name: 'Zerya Betül' },
        ]} 
        options={{
            selection: true
        }}       
        actions={[
        {
        
            icon: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            tooltip: 'Save Minions',
            onClick: (event, rowData) => {this.clickOpen()}
            
            
        }
        ]}
         />
        {
            this.state.clickSave === true?
            (<div className={this.props.classes.msg}>
            
                <Snackbar open={this.state.msg} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    The commands you made were received in the system!
                    </Alert>
                </Snackbar>
            </div>
             ):<div></div>
         }
         {
                (this.state.clickSave === true && this.state.msg === false)?
                (<div className={this.props.classes.msg}>
                
                <Snackbar open={this.state.msg} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    warining!
                    </Alert>
                </Snackbar>
            </div>
                ):<div></div>
        }

        
    </div>




                <Paper component="form" className={this.props.classes.root}>
                    <IconButton className={this.props.classes.iconButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
        
                    <InputBase
                    className={this.props.classes.input}
                    placeholder="Send comments"
                    inputProps={{ 'aria-label': 'Send comments' }}
                    />
                
                 
                    
                        <IconButton color='primary' size='medium' className={this.props.classes.iconButton} aria-label="directions" onClick={this.handleClick}>
                            <SendIcon />
                        </IconButton>
                </Paper>

                 
                    <div className={this.props.classes.Divider}>
                        History
                        <Divider light  style={{width:400}}/>
                    </div>


                 <div className={this.props.classes.minionStyle}>
                    <MinionCard></MinionCard>
                    <MinionCard></MinionCard>
                    <MinionCard></MinionCard>
                    
                 </div>
               





             
    </div>
    );
  }

}

export default withStyles(styles)(SaltStack);