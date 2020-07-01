import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import store from '../store';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
const styles = theme => ({
    root: {
        minWidth: 345,
        maxWidth: 400,
        margin:theme.spacing(2.5),
       
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
      paragraph:{
          paddingLeft:theme.spacing(7.8),
          wordWrap:'break-word',
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
class TeamCard extends React.Component {
    constructor(props) {
        super(props); 
        //this.handleExpandClick = this.handleExpandClick.bind(this);
        this.deleteIcon = this.deleteIcon.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state={expanded:false,UpperCase:'',open:false,isDelete:false};
        let strName=this.props.first_name.toUpperCase();
        this.props.first_name !== ''?this.state.UpperCase=this.props.first_name.toUpperCase()[0]:this.state.UpperCase="";
    }
    handleClose(){
      this.setState((prevState) => ({open:!prevState.open}));
      const { password, ReturnPassword,Role,Email,first_name,last_name } = this.state;
      const body = JSON.stringify({first_name:first_name,last_name:last_name,role:Role,email:Email, password:password });
      axios.delete("/delete/"+this.props.id, tokenConfig(store.getState))
      .then((res)=> {
        this.setState({isDelete:true});});
          //  this.props.arr=temp;
    }
    handleClickOpen(){
      this.setState((prevState) => ({open:!prevState.open}));
    }
    deleteIcon(){

    }
    // handleExpandClick(){
    //       this.setState((prevState) => ({expanded:!prevState.expanded}));
    // }



    render()
    {
      const colors = ['#ff0000', '#00ff00', '#0000ff'];
      const random_color = colors[Math.floor(Math.random() * colors.length)];
      //console.log(this.props);
        return (
      this.state.isDelete===false?
      (<Card className={this.props.classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={this.props.classes.avatar}>
              {this.state.UpperCase}
            </Avatar>
          }
      // action={
      //       <IconButton aria-label="settings">
      //         <AccountCircleIcon />
      //       </IconButton>
      //     }first_name
          title={this.props.first_name+' '+this.props.last_name}
          subheader={this.props.role}
        />
      
        <CardContent>
          <Typography paragraph className={this.props.classes.paragraph}>
          Email:{this.props.mail}
          </Typography>
          <Typography paragraph className={this.props.classes.paragraph}>
        {/* number:0549494949*/}
          </Typography>

        </CardContent>

        <CardActions disableSpacing>
        
      <IconButton 
      aria-label="share"
      variant="outlined" 
      //color="primary" 
      onClick={this.handleClickOpen}
        //onClick={this.handleExpandClick}
      color='secondary'
        >
            <DeleteIcon />
      </IconButton>
      <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete a user from the system?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={this.handleClickOpen} color="primary">
        Cancel
      </Button>
        <Button onClick={this.handleClose} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
      </Dialog>
      {/*
          <IconButton
            className={clsx(this.props.classes.expand, {
              [this.props.classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          */}
        </CardActions>


        {/*<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Heat
            </Typography>
          </CardContent>
        </Collapse>*/}
      </Card>)
:<div></div>
    


          );
        }
    
}

export default withStyles(styles)(TeamCard);