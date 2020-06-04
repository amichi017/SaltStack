import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios';

import { connect } from 'react-redux';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.updatePass = this.updatePass.bind(this);
    this.state = {
      email: { value: null, error: false, helperText: null },
      old_password1: { value: null, error: false, helperText: null },
      old_password2: { value: null, error: false, helperText: null },
      new_password: { value: null, error: false, helperText: null },
      msg: null
    };
  }


  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'Weak Password') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }


  updatePass(event){
    event.preventDefault();
    if (this.emailInput.value === "") {
      this.setState({
        email: {
          value: this.emailInput.value,
          error: true,
          helperText: "Your email must be specified."
        }
      });
      this.emailInput.focus();
    }
    else{
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

         const user = {
              email: this.emailInput.value,
              old_password1: this.old_password1.value,
              old_password2: this.old_password2.value,
              new_password: this.new_password.value,

            };


        // Request body
        const body = JSON.stringify({ user });
    
        axios.post('/forgot_password', body, config)
        .then(res =>{
            this.setState({ msg: res.message })
            }
          
        )
        .catch(err => {
            this.setState({ msg: err.message })
      
        })
        
     }
  }


  render(){
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
          <form className={classes.form} onSubmit={this.signIn} >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              required
              inputRef={input => (this.emailInput = input)}
              error={this.state.email.error}
              helperText={this.state.email.helperText}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password1"
              type="password1"
              id="password1"
              autoComplete="current-password"
              inputRef={input => (this.passwordInput = input)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password2"
              type="password2"
              id="password2"
              autoComplete="current-password"
              inputRef={input => (this.passwordInput = input)}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Password
            </Button>

            {this.state.msg  ? (
            <Alert severity="error">{this.state.msg}</Alert>
              ) : (
              null
              )}
              
              <Grid item xs>
                <Link onClick={this.props.handler} variant="body2">
                  Back to login
                </Link>
              </Grid>
            
          </form>
        </div>
        
      </Container>
    );
  }
}



export default connect(
)(withStyles(styles)(ChangePasswordForm))