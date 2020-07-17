
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
import { teamList } from '../actions/date';
import { FAB } from '../actions/types';
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
        marginTop:theme.spacing(-3),
        marginLeft:theme.spacing(57),
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




    
 

    class FormOfTeam extends React.Component {
        constructor(props) {
            super(props);
          
            //this.ClickFab = this.ClickFab.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.signIn = this.signIn.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
            this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
            this.handleClickShowPasswordReturn = this.handleClickShowPasswordReturn.bind(this);
            this.handleMouseDownPasswordReturn = this.handleMouseDownPasswordReturn.bind(this);
            console.log("pppppppppppppppppppp")
         
            this.state=
            {
              Team:[],
              expanded:false,
              fab:false,
              first_name:this.props.first_name,
              last_name:this.props.last_name,
              Role:this.props.Role,
              Email:this.props.Email,
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
          handleInputChange(e) {
  
            this.setState({ [e.target.name] : e.target.value});
            // console.log(this.state);
          }
          handleClose (event, reason) 
          {
              if (reason === 'clickaway') {
                return;
              }
          
              
              this.setState({errPassword:false,saveCard:false});
          }
 
        signIn(event){
            axios.get('/get_users',tokenConfig(store.getState))
            .then((res) => { 
             
              this.setState({Team:res.data});
            })
            .catch(err => {
                console.log(err);
        
               });
            event.preventDefault();
            const { password, ReturnPassword,Role,Email,first_name,last_name } = this.state;
            //send cardTeam to server
            //console.log("event.preventDefault()");
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            const emailRegex = new RegExp("[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}");    
            let flag=true;
            if((strongRegex.test(password)===false) || ( password.length>30)  ){flag=false;this.setState({err_Password:true});setTimeout(()=>{this.setState({err_Password:false});}, 10000);}
            if(first_name.length>30 ){flag=false;this.setState({err_first_name:true});setTimeout(()=>{this.setState({err_first_name:false});}, 6000);}
            if(last_name.length>30 ){flag=false;this.setState({err_last_name:true});setTimeout(()=>{this.setState({err_last_name:false});}, 6000);}
            if(Role.length>30 ){flag=false;this.setState({err_Role:true});setTimeout(()=>{this.setState({err_Role:false});}, 6000);}
            if((Email.length>50) || (emailRegex.test(this.state.Email.toUpperCase())===false)){flag=false;this.setState({err_Email:true});setTimeout(()=>{this.setState({err_Email:false});}, 6000);}
            if (password===ReturnPassword){}
            else
            {
              this.setState({errPassword:true});
              setTimeout(()=>{this.setState({errPassword:false});}, 6000);
            }
            if(store.getState().fab.details.upDate===true &&(password===ReturnPassword) && (flag===true)){
                this.state.Team.map((item)=>{
                    if( (item.first_name === store.getState().fab.details.first_name)
                    && (item.last_name === store.getState().fab.details.last_name)
                    && (item.Role === store.getState().fab.details.Role)
                    && (item.Email === store.getState().fab.details.Email))
                    {
                            // make update
                    }
                    store.getState().fab.details.upDate=false;
                    return;
                })
            }
          
       
       
            if((password===ReturnPassword) && (flag===true)){
        
                this.setState((prevState) => ({fab:false}));
                 
          
                    const body = JSON.stringify({first_name:first_name,last_name:last_name,role:Role,email:Email, password:password });
                    //console.log(body,'body')
                    axios.post("/register", body, tokenConfig(store.getState))
                  .then(res => 
                    {
                      this.state.Team.push({first_name:first_name,mail:Email,role:Role,last_name:last_name});
                      this.setState({saveCard:true});
                      setTimeout(()=>{this.setState({saveCard:false});}, 4000);
                    }
                  )
                    .catch(err => {
                    console.log(err)
                    this.setState({no_add_card:true});
                    setTimeout(()=>{this.setState({no_add_card:false});}, 4000);
                    })
          
                    
          
                    this.setState({expanded:false,
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
                      UnsecuredPassword:false,
                    });
                     
                   
                  
                    store.dispatch({
                      type:FAB,
                      payload:false
                    })
                  console.log(store.getState(),"form")
                 
              }
        }
           
                 
    render(){

        return(

            <div className={this.props.classes.field}>
            <form className={this.props.classes.form} onSubmit={this.signIn} >
              <div className={this.props.classes.input}>
    
                <TextField
                  className={this.props.classes.margin}
                  id="input-with-icon-textfield"
                  label="First Name"
                  required
                  fullWidth
                  name='first_name'
                  value={this.state.first_name}
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
    
              {
                this.state.err_first_name===true?
                (   <div className={this.props.classes.msg}>
                  
                    <Alert onClose={() =>{this.setState({err_first_name:false})}} severity="error">
                    The first name must be less than  <strong>30 characters  </strong>
                    </Alert>
                    </div>
                )
                :<div></div>
             }
              <div className={this.props.classes.input}>
    
              <TextField
                className={this.props.classes.margin}
                id="input-with-icon-textfield"
                label="Last Name"
                fullWidth
                name='last_name'
               
                value={this.state.last_name}
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
  
  
            {
              this.state.err_last_name===true?
              (   <div className={this.props.classes.msg}>
                
                  <Alert onClose={() =>{this.setState({err_last_name:false})}} severity="error">
                  The last name must be less than  <strong>30 characters  </strong>
                  </Alert>
                  </div>
              )
              :<div></div>
           }
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
    
  
              {
                this.state.err_Email===true?
                (   <div className={this.props.classes.msg}>
                  
                    <Alert onClose={() =>{this.setState({err_Email:false})}} severity="error">
                     <strong> Invalid mail  </strong>
                    </Alert>
                    </div>
                )
                :<div></div>
             }
    
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
  
              {
                this.state.err_Role===true?
                (   <div className={this.props.classes.msg}>
                  
                    <Alert onClose={() =>{this.setState({err_Role:false})}} severity="error">
                    The role name must be less than  <strong>30 characters  </strong>
                    </Alert>
                    </div>
                )
                :<div></div>
             }
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
              {
                this.state.err_Password===true?
                (   <div className={this.props.classes.msg}>
                  
                    <Alert onClose={() =>{this.setState({err_Password:false})}} severity="error">
                    The password <strong>must </strong>  be at least 8 characters long, and include uppercase and lowercase letters, and special characters
                         <strong>{"{ !, @, #, \, $,%, \, ^ &, \, * }"}  </strong>
                    </Alert>
                    </div>
                )
                :<div></div>
             }
              
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
                label="Repeat Password"
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
                
                  <Alert onClose={() =>{this.setState({errPassword:false})}} severity="error">
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

        );
 }



 }
export default withStyles(styles)(FormOfTeam);