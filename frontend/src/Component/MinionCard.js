import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import store from '../store';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {SAVE_MINION} from "../actions/types";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    maxWidth: 260,
   
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
    overflow:'wrap'
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 12,
  },
  container: {
    width: 300,
    display: 'flex',
    flexWrap: 'wrap',
  },
});


class MinionCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.onClickMinion = this.onClickMinion.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        const commentg= this.props.comment;
       // console.log(this.props.id,'constructor');
       this.state={ 
          open: false,
          defer: false,
          click:false,
          comment: commentg,
          listOpen:false
        };
    }
    onClickMinion(){
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
      // console.log(store.getState(),"store.getState() from minionCard");
    }
    handleClickButton(){
      this.state.listOpen=!(this.state.listOpen);
  
  
    }
render(){
  // id={item.id} minion={item.minions} comment={item.comment}
    const bull = <span className={this.props.classes.bullet}>•</span>;
    if(this.state.comment===''){this.state.click =true}
    if(this.state.click === false)
    return (
     
      <Card className={this.props.classes.root}>
        <CardContent>

          <Button onClick={()=>{this.onClickMinion()}}>
            <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
            fun: {this.props.comment}
            {/*this.props.fun*/}
            </Typography>
          </Button>

            <Typography variant="h5" component="h2">
              <div>
                <div className={this.props.classes.container}>
                  <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      className={this.props.classes.root2}
                    >
                    <ListItem 
                      button   
                      onClick={() =>
                        this.setState({
                        listOpen: !this.state.listOpen,
                        })}
                      >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      
                      <ListItemText primary="See minions" />
                          {this.state.listOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      {
                          this.props.minion.map((item)=>{
                            return(
                            <Collapse in={this.state.listOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              <ListItem  className={this.props.classes.nested}>
                                  <ListItemIcon>
                                      <StarBorder />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                              </ListItem>
                            </List>
                          </Collapse>
                          )
                          })
                        }
                  </List>
                </div>
               </div>
            </Typography>
            
          {/*button*/}
          </CardContent>
          <CardActions>
           
        </CardActions>
      </Card>
     
       
      );
      else{return(<div></div>);}
}
  
}

export default withStyles(styles)(MinionCard);


