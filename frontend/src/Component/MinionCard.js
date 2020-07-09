import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import store from '../store';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {SAVE_MINION} from "../actions/types";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const styles = theme => ({
  root: {
    maxWidth: 400,
    Width:400,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  root2: {
    width: 230,
    maxWidth: 360,
    fontSize:12,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    overflow:'wrap',
    paddingLeft: theme.spacing(2),
   // paddingTop: theme.spacing(2),
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 12,
  },
  container: {
    width: 500,
    display: 'flex',
    flexWrap: 'wrap',
    overflow:'wrap'
  },
  minions:{
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
  CardContent:{
    maxWidth: 400,
    width: 400,
  
  },
  CircularProgress:{
     paddingLeft: theme.spacing(20),
    //paddingTop: theme.spacing(),
  },
  TreeItem:{
    color:'#26a852',
  },
});


class MinionCard extends React.Component {
    constructor(props) {
        super(props);
        
        
        const commentg= this.props.comment;
       // console.log(this.props.id,'constructor');
       this.state={ 
          open: false,
          defer: false,
          click:false,
          comment: commentg,
          listOpen:false,
          open:false,
        };
        this.onClickMinion = this.onClickMinion.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this. handleClose = this. handleClose.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      //console.log(nextProps,"nextProps")
      if(nextProps.prepared!==this.props.prepared){

      }
    }
    onClickMinion(){
    
      // console.log(store.getState(),"store.getState() from minionCard");
    }
    handleClickButton(){
      this.state.listOpen=!(this.state.listOpen);
  
  
    }
    handleClickOpen(){
      this.setState((prevState) => ({open:!prevState.open}));
      console.log(this.state,"stste from handleClickOpen")
    }
    handleClose(){
      this.setState((prevState) => ({open:!prevState.open}));
      this.setState({click:true});
      let array =store.getState().saveMinion.saveMinion;
      
     
      let minions=array.filter((item)=>{
        if(item.id !==this.props.id){return (item)}
      });
      minions=minions.map((item,index)=>{
       return( {...item,id:index+1});
      })
      // minions.unshift(this.state.saveMinion[0]);
      store.dispatch({
          type: SAVE_MINION,
          payload: minions
      });
    }
render(){
  // id={item.id} minion={item.minions} comment={item.comment}
    const bull = <span className={this.props.classes.bullet}>•</span>;
    console.log(this.props,"this.props")
    if(this.state.comment===''){this.state.click =true}
    if(this.state.click === false && this.props.prepared===true){
      return (
     
        <Card className={this.props.classes.root}>
          <CardContent>
  
           
              <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
              Fun: {this.props.comment}
              {/*this.props.fun*/}
              </Typography>
              <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
              Parameter: {this.props.Parameter}
              {/*this.props.fun*/}
              </Typography>
        
              <Typography variant="h5" component="h2" color="textSecondary" >
                <div>
                  <div className={this.props.classes.container}>
                                <TreeView
                                className={this.props.classes.root}
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                              >
                        <TreeItem nodeId="1" label="See Minions">
                        {
                            this.props.minion.map((item,index)=>{
                             // console.log(index,"index")
                              return(
                                <TreeItem nodeId={index+2} label={item[0]} className={this.props.classes.TreeItem}>
                                  <TreeItem nodeId={index+3} label={item[1]} />
                                  
                                </TreeItem>
                            )
                            })
                          }
                          </TreeItem>
                    </TreeView>
                  </div>
                 </div>
              </Typography>
              
            {/*button*/}
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
          Are you sure you want to delete the command from history?
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
  
        </Card>
       
         
        );
    }
  
      else if (this.props.prepared===false)
      {
        //console.log("props from minioncard")
        //console.log(this.props,"props from minioncard")
        return(
          <Card className={this.props.classes.root}>
            
            <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
              Fun: {this.props.comment}
              {/*this.props.fun*/}
              </Typography>
              <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
              Parameter: {this.props.Parameter}
              {/*this.props.fun*/}
              </Typography>
           
            <CardContent className={this.props.classes.CardContent}>
              <div className={this.props.classes.CircularProgress}> <CircularProgress /></div>
            
            </CardContent>
          </Card>
        );
      }
      else{return(<div></div>);}
}
  
}

export default withStyles(styles)(MinionCard);


