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
import Alert from '@material-ui/lab/Alert';


import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



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

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
      first_name: { value: null, error: false, helperText: null },
      last_name: { value: null, error: false, helperText: null },
      email: { value: null, error: false, helperText: null },
      password: { value: null, error: false, helperText: null },
      msg: null
    };
  }
  static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      register: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
  }

  componentDidMount(prevProps){
    const { error } = this.props;
    if(error !== prevProps.error){
      // Check for register error
      if(error.id === 'REGISTER_FAIL'){
        this.setState({ msg: error.msg.msg})
      }

    }
  }
  

  // async register(first_name,last_name,email,password){ 
  //     const data = {
  //       first_name: first_name,
  //       last_name: last_name,
  //       email: email,
  //       password: password,
  //      }



  // try {
  //     const response = await fetch("http://127.0.0.1:5000/register", {
  //       method: 'POST', // or 'PUT'
  //       mode: 'cors',
  //       body: JSON.stringify(data), // data can be `string` or {object}!
  //       headers: {            'cache-control': 'no-cache',
  //                             'Content-Type': 'application/json'},
  //     });
  //        const json = await response.json();
  //        console.log('Success:', JSON.stringify(json));
  //        } catch (error) {
  //         console.error('Error:', error);
  //        }
  //   }
  

  async register(first_name,last_name,email,password){ 
      const newUser = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
       }

      // Attempt to register
      this.props.register(newUser)

    };
  

   signUp(event) {
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
    }else if (this.passwordInput.value === "") {
        this.setState({
          password: {
            value: this.passwordInput.value,
            error: true,
            helperText: "Your password must be specified."
          }
        });
        this.passwordInput.focus();
      }else if (this.first_nameInput.value === "") {
        this.setState({
          first_name: {
            value: this.first_nameInput.value,
            error: true,
            helperText: "Your first name must be specified."
          }
        });
        this.first_nameInput.focus();
      }else if (this.last_nameInput.value === "") {
        this.setState({
          last_name: {
            value: this.last_nameInput.value,
            error: true,
            helperText: "Your last name must be specified."
          } 
        });
        this.last_nameInput.focus();
      }else{
      this.register(this.first_nameInput.value,this.last_nameInput.value,this.emailInput.value,this.passwordInput.value);
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
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={this.signUp} >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="first_name"
            name="first_name"
            autoComplete="first_name"
            autoFocus
            required
            inputRef={input => (this.first_nameInput = input)}
            error={this.state.first_name.error}
            helperText={this.state.first_name.helperText}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="last_name"
            name="last_name"
            autoComplete="last_name"
            autoFocus
            required
            inputRef={input => (this.last_nameInput = input)}
            error={this.state.last_name.error}
            helperText={this.state.last_name.helperText}
          />
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
            name="password"
            label="Password"
            type="password"
            id="password"
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
            Sign Up
          </Button>

          {this.state.msg  ? (
            <Alert severity="error">{this.state.msg}</Alert>
              ) : (
              null
              )}
          
          <Grid container>
            <Grid item xs>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
    }
}




const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  })

 export default connect(
      mapStateToProps,
      { register,
      clearErrors }
)(withStyles(styles)(RegisterForm));
