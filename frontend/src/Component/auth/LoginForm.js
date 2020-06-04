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

import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StoreTwoTone } from '@material-ui/icons';
import store from '../../store';
import { Route } from 'react-router-dom';
import ForgotPasswordForm from './ForgotPasswordForm';
import ChangePasswordForm from './ChangePasswordForm';


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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handler = this.handler.bind(this);
    this.state = {
      email: { value: null, error: false, helperText: null },
      password: { value: null, error: false, helperText: null },
      msg: null
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg });
        setTimeout(function(){
          this.setState({msg:null});
          }.bind(this),3000);  // clear error after 3 seconds
      } else {
        this.setState({ msg: null });
      }
    }
  }


   handler(){
     this.setState(
      {screen: 'login'}
     )
   }
  

   signIn(event){
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
      const user = {
        email: this.emailInput.value,
        password: this.passwordInput.value,
       };
  
      const log = this.props.login(user);
      console.log(log)
      this.props.history.push('/'); 
    }

  }
  

  render(){
    if (this.state.screen === 'forgot')
      return <ForgotPasswordForm handler={this.handler}/>
    if (this.state.screen === 'change')
      return <ChangePasswordForm handler={this.handler}/>

    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={input => (this.passwordInput = input)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            {this.state.msg  ? (
            <Alert severity="error">{this.state.msg}</Alert>
              ) : (
              null
              )}

            <Grid container>
              <Grid item xs>
                <Link onClick={() => this.setState({screen:'forgot'})} variant="body2">
                {"Reset Your Password"}
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => this.setState({screen:'change'})} variant="body2">
                  {"Do you want to update your password?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      
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
    { login, clearErrors }
)(withStyles(styles)(LoginForm))