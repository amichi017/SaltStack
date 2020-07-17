
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import store from '../store';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

import {REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/types';
import {returnErrors}  from '../actions/errorActions';

import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TeamCard from './TeamCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ContactsOutlined } from "@material-ui/icons";
import Snackbar from '@material-ui/core/Snackbar';
import { FAB } from '../actions/types';
import FormOfTeam from './FormOfTeam';
import {connect} from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
const styles = theme => ({
  root: {
    // maxWidth: 1000,
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap:'warp',
    //justifyContent:'space-around', 
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    maxWidth:1300,
    justifyContent:'space around'

    },
    field:{
      display: 'flex',
      flexDirection: 'column',
      Width:150,
      maxWidth:150,
    
      justifyContent:'space around',
      marginTop:theme.spacing(0),
      marginLeft:theme.spacing(55.5),
    },
    input:{
      paddingTop:theme.spacing(2),
      paddingLeft:theme.spacing(-4)
    },
    paragraph:{
        paddingLeft:theme.spacing(7.8)
    },
    fab:{
      color:'#fff',
      //cursor: 'pointer',
      border:'none',
      outline: 'none',
      outlineOffset: 'none',
      marginLeft:theme.spacing(4),
      marginTop:theme.spacing(4)
    },
    button:{
      marginTop:theme.spacing(6)
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    msg:{
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
  },
});
const tokenConfig = getState => {
  // console.log("getstatteeeeeslatl",getState())
   // Get token from localstorage
   const token = getState().auth.token;

   // Headers
   const config = {
       headers: {
          'Content-Type': 'application/json'
       }
   }

   // If token, add to headers
   if(token) {
      config.headers["Authorization"] = ` Bearer ${token} `;
   }

return config;
}
class Team extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.ClickFab = this.ClickFab.bind(this);
        // this.handleClose = this.handleClose.bind(this);
        // this.signIn = this.signIn.bind(this);
       // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        // this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        // this.handleClickShowPasswordReturn = this.handleClickShowPasswordReturn.bind(this);
        // this.handleMouseDownPasswordReturn = this.handleMouseDownPasswordReturn.bind(this);
        this.initTeam = this.initTeam.bind(this);
       // this.handleCloseAlert = this.handleCloseAlert.bind(this);
        this.state=
        {
          expanded:false,
          fab:false,
          first_name:'',
          last_name:'',
          Role:'',
          Email:'',
          Password:'',
          ReturnPassword:'',
          showPasswordReturn:'password',
          showPassword:'password',
          errPassword:false,
          saveCard:false,
          Team:[],
          counter:0,
          err_first_name:false,
          err_last_name:false,
          err_Role:false,
          err_Email:false,
          err_Password:false,
          no_add_card:false,
          
        };
        this.initTeam();
        store.dispatch({
          type:FAB,
          payload:false
        })
    }

    initTeam(){
      axios.get('/get_users',tokenConfig(store.getState))
      .then((res) => { 
       
        this.setState({Team:res.data});
      })
      .catch(err => {
          console.log(err);
  
         });
   
      
    }

    handleExpandClick(){
          this.setState((prevState) => ({expanded:!prevState.expanded}));
    }
 
    ClickFab(){
      this.setState((prevState) => ({
      fab:!prevState.fab,password:'',
      first_name:'',
      lastName:'',
      Role:'',
      Email:'',
      Password:'',
      ReturnPassword:'',}));

      store.dispatch({
        type:FAB,
        payload:true
      })
      this.forceUpdate();

    
    }
   
    componentWillReceiveProps(nextProps,nextState) {
     // console.log("componentWillReceiveProps")
      //  console.log(this.props.fab,"this.props.fab")
       // console.log("nextProps.fab",nextProps.fab)
 
      if(nextProps.fab!==this.props.fab){
        this.forceUpdate();
        //console.log("if")

    }

  }
     
    render()
   
    {
      
      if(store.getState().fab.fab === false){

          return(

            <div>
          
              
              <div className={this.props.classes.msg}>
                <Snackbar open={this.state.saveCard} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    The system added  <strong>a new staff member   </strong>
                    </Alert>
                    </Snackbar>
                </div>

                <div className={this.props.classes.msg}>
                <Snackbar open={this.state.no_add_card} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    The system   <strong> not added a new staff member   </strong>
                    </Alert>
                    </Snackbar>
                </div>
               
                <div className={this.props.classes.root}> 
                {
                
                  this.state.Team.map((item,arr)=>{
                  if(this.state.Team.length !== 0){ 
                    
                    return <TeamCard  arr={arr} first_name={item.first_name}  last_name={item.last_name} role={item.role} mail={item.email} id={item._id}/>
                  }
                  
                })
              }
              </div>
              <Fab color="primary" aria-label="add" className={this.props.classes.fab} onClick={this.ClickFab}>
              <AddIcon />
            </Fab>
           </div>
          );

      }

      else
      {
       
        return(
          <div>
          <Button
          variant="contained"
          color="primary"
       
          onClick={()=>{store.dispatch({
            type:FAB,
            payload:false
          })}}
          className={this.props.classes.button}
          startIcon={<ArrowBackIcon />}
        >
          back
        </Button>
         <FormOfTeam first_name={store.getState().fab.details.first_name} 
         last_name={store.getState().fab.details.last_name} 
         Role={store.getState().fab.details.Role} 
         Email={store.getState().fab.details.Email}
        ></FormOfTeam>
         </div>
        )
      }
   
    
  }}


  const mapStateToProps = (state, ownProps) => {
    return {
        fab: state.fab,
      
    }
}
  export default connect(mapStateToProps)(withStyles(styles)(Team));

