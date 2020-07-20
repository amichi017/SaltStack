
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
import { FAB,FAB_WITH_DATA,GET_ERRORS } from '../actions/types';
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
        this.initTeam = this.initTeam.bind(this);
        this.state=
        {
          expanded:false,
          fab:false,
          first_name:'',
          last_name:'',
          Role:'',
          Email:'',
          Password:'',
          saveCard:false,
          Team:[], 
          no_add_card:false,
          update_card:false,
          not_update_card:false,
          
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
        this.forceUpdate();
        //console.log(this.state,"this.state vvvvv");
      })
      .catch(err => {
          console.log(err);
  
         });
   
      
    }

    handleExpandClick(){
          this.setState((prevState) => ({expanded:!prevState.expanded}));
    }
 
    ClickFab(){
    //   this.setState((prevState) => ({
    //   fab:!prevState.fab,password:'',
    //  }));
     let res={
      first_name:'',
      lastName:'',
      Role:'',
      Email:'',
      upDate:false,
      
      }
       
    store.dispatch({
        type:FAB_WITH_DATA,
        payload:res
      })
      store.dispatch({
        type:FAB,
        payload:true
      })
      
      this.forceUpdate();

    
    }
   
    componentWillReceiveProps(nextProps,nextState) {
      const initialState = {
        msg: {},
        status: null,
        id: null
    }
    
      if(store.getState().error.id===1){
        this.setState({saveCard:true});
              setTimeout(()=>{this.setState({saveCard:false});}, 7000);
      }
      if(store.getState().error.id===2){
        this.setState({no_add_card:true});
              setTimeout(()=>{this.setState({no_add_card:false});}, 7000);
      }
      if(store.getState().error.id===3){
        this.setState({update_card:true});
              setTimeout(()=>{this.setState({update_card:false});}, 7000);
      }
      if(store.getState().error.id===4){
        this.setState({not_update_card:true});
              setTimeout(()=>{this.setState({not_update_card:false});}, 7000);
      }
      store.dispatch({
        type:GET_ERRORS,
        payload:initialState
      })
       // if(nextprops)
        this.initTeam();
        this.forceUpdate();
       //console.log(this.state,"this.state 12345");

  }
     
    render()
   
    {
      
      if(store.getState().fab.fab === false){

          return(

            <div>
          
              
              <div className={this.props.classes.msg}>
                <Snackbar open={this.state.saveCard} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    The system added  <strong>a new staff member   </strong>
                    </Alert>
                    </Snackbar>
                </div>
                <div className={this.props.classes.msg}>
                <Snackbar open={this.state.update_card} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    The system has   <strong>updated the Staff member  </strong>
                    </Alert>
                    </Snackbar>
                </div>

                <div className={this.props.classes.msg}>
                <Snackbar open={this.state.no_add_card} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    The system   <strong> not added a new staff member   </strong>
                    </Alert>
                    </Snackbar>
                </div>
                <div className={this.props.classes.msg}>
                <Snackbar open={this.state.not_update_card} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    The system did not update the data <strong>because Internal Server Error  </strong>
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

