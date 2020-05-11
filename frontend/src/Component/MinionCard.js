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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
const styles = theme => ({
  root: {
    maxWidth: 300,
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
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
const LargeTree = ()=> {
  return Array.from(new Array(10)).map((_, index) => <span key={index}>.</span>);
}

class MinionCard extends React.Component {
    constructor(props) {
        super(props);
        this.onClickMinion = this.onClickMinion.bind(this);
        const commentg= this.props.comment;
       this.state={ 
          open: false,
          defer: false,
          click:false,
          comment: commentg
        };
    }
    onClickMinion(){
       this.setState({click:true})
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

               <Button
               variant="outlined"
               color="primary"
              className={this.props.classes.button}
              startIcon={<ArrowDownwardIcon />}
               size="small"
               onClick={() =>
                this.setState({
                  open: !this.state.open,
                  defer: false,
                })
              }
            >
              
               
               See minions
               
               
               </Button>
               <div className={this.props.classes.container}>
               {this.state.open ? (
                 <React.Fragment>
                     <LargeTree />  
                 </React.Fragment>
               ) : null}
             </div>
               </div>


            </Typography>
            <Typography variant="h5" component="h2">
            {this.props.minion}
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


