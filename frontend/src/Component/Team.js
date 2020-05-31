
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
import RegisterForm from './auth/RegisterForm';
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
        maxWidth:250,
        justifyContent:'space around',
        marginTop:theme.spacing(0),
        marginLeft:theme.spacing(55.5),
      },
      input:{
        paddingTop:theme.spacing(4)
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
        marginTop:theme.spacing(10)
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
        this.handleClose = this.handleClose.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleClickShowPasswordReturn = this.handleClickShowPasswordReturn.bind(this);
        this.handleMouseDownPasswordReturn = this.handleMouseDownPasswordReturn.bind(this);
        
        this.state=
        {
          expanded:false,
          fab:false,
          Name:'',
          Role:'',
          Email:'',
          Password:'',
          ReturnPassword:'',
          showPasswordReturn:'password',
          showPassword:'password',
          errPassword:false,
          saveCard:false,
          Team:[],
        };
    }
    handleClickShowPassword(){
      this.setState({showPassword:'text'});
    }
    handleMouseDownPassword(){
      this.setState({showPassword:'password'});
    }
    handleClickShowPasswordReturn(){
      this.setState({showPasswordReturn:'text'});
    }
    handleMouseDownPasswordReturn(){
      this.setState({showPasswordReturn:'password'});
    }









    handleExpandClick(){
          this.setState((prevState) => ({expanded:!prevState.expanded}));
    }
 
    ClickFab(){
      this.setState((prevState) => ({fab:!prevState.fab,password:''}));
    
    }
   
    signIn(event){
    
      event.preventDefault();
      const { password, ReturnPassword,Role,Email,Name } = this.state;
      //send cardTeam to server
      let cardTeam={password:password,Role:Role,Email:Email,Name:Name};

      if(password===ReturnPassword){
        this.state.Team.push({name:Name,mail:Email,role:Role});

        const body = JSON.stringify({first_name:Name,last_name:'fffff',email:Email, password:password });
        console.log(body,'body')
        axios.post("http://127.0.0.1:5000/register", body, tokenConfig(store.getState))
       .then(res => 
        // store.dispatch({
        //     type: REGISTER_SUCCESS,
        //     payload: res.data
        // }))
        console.log(res,'res.data')
       )
        .catch(err => {
        console.log(err)
        // store.dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        // store.dispatch({
            // type: REGISTER_FAIL
        //  })
        })



        this.setState({expanded:false,
          fab:false,
          Name:'',
          Role:'',
          Email:'',
          Password:'',
          ReturnPassword:'',
          showPasswordReturn:'password',
          showPassword:'password',
          errPassword:false,
        });
          this.setState({saveCard:true});
          setTimeout(()=>{this.setState({saveCard:false});}, 4000);
         this.setState((prevState) => ({fab:false}));
       

      }
      else{
        this.setState({errPassword:true});
        setTimeout(()=>{this.setState({errPassword:false});}, 2200);
        
      }
    
      
   
    }
    // shouldComponentUpdate(nextState) {
    //   console.log(nextState,"nextState")
    //   if(this.state.Password === nextState.ReturnPassword || nextState.Password === this.state.ReturnPassword){
    //     console.log("7878787")
    //     //this.setState((prevState) => ({fab:false}));
    //   }
    // }
    handleInputChange(e) {
       
       this.setState({ [e.target.name] : e.target.value});
      console.log(this.state);
  

    }
    handleClose (event, reason) 
    {
        if (reason === 'clickaway') {
          return;
        }
     
        this.setState({errPassword:false,saveCard:false});
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log(nextState,"nextState");
    //  }
    render()
    
    {
      if(this.state.fab === false){

          return(

            <div>
        
              <div className={this.props.classes.root}>
                {this.state.Team.map((item)=>{
                  if(this.state.Team.length !== 0){ 
                    return <TeamCard  name={item.name} role={item.role} mail={item.mail} />
                  }
                  
                })}
              </div>
              <div className={this.props.classes.msg}>
                <Snackbar open={this.state.saveCard} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                    The system added  <strong>a new staff member   </strong>
                    </Alert>
                    </Snackbar>
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
          <div className={this.props.classes.field}>
          <form className={this.props.classes.form} onSubmit={this.signIn} >
            <div className={this.props.classes.input}>
  
              <TextField
                className={this.props.classes.margin}
                id="input-with-icon-textfield"
                label="Name"
                required
                fullWidth
                name='Name'
                value={this.state.Name}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
  
            </div>
  
            <div className={this.props.classes.input}>
  
              <TextField
                className={this.props.classes.margin}
                id="input-with-icon-textfield"
                label="Email"
                required
                fullWidth
                name='Email'
                value={this.state.Email}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
  
            </div>
  
  
            <div className={this.props.classes.input}>
  
              <TextField
                className={this.props.classes.margin}
                id="input-with-icon-textfield"
                label="Role"
                name='Role'
                fullWidth
                value={this.state.Role}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                
              />
  
            </div>
            <div className={this.props.classes.input}>
  
              <TextField
                className={this.props.classes.margin}
                id="input-with-icon-textfield"
                label="password"
                //variant="outlined"
                //margin="normal"
                required
                fullWidth
               
                name="password"
                label="Password"
                type={this.state.showPassword==='text'  ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword==='text' ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
               
              />
  
            </div>
  
            <div className={this.props.classes.input}>
  
            <TextField
              className={this.props.classes.margin}
              id="input-with-icon-textfield"
              label="password"
              //variant="outlined"
              //margin="normal"
              required
              fullWidth
              name="ReturnPassword"
              label="Return Password"
              type={this.state.showPasswordReturn==='text' ? 'text' : 'password'}
              value={this.state.ReturnPassword}
                onChange={this.handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPasswordReturn}
                      onMouseDown={this.handleMouseDownPasswordReturn}
                    >
                      {this.state.showPasswordReturn==='text' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
             
            />
  
          </div>
          {
            this.state.errPassword===true?
            (   <div className={this.props.classes.msg}>
              
                <Alert onClose={this.handleClose} severity="error">
                 Passwords  <strong>unequal   </strong>
                </Alert>
                </div>
            )
            :<div></div>
         }
      
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="small"
              fullWidth
              className={this.props.classes.button}
             // onClick={this.ClickFab}
              startIcon={<SaveIcon />}
            >
              Save
              </Button>
             
          </form> 
            
          </div>
        )
      }
   
    
    }
  }

export default withStyles(styles)(Team);