
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
const styles = theme => ({
    root: {
        minWidth: 345,
        maxWidth: 400,
        margin:theme.spacing(2.5)
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
          paddingLeft:theme.spacing(7.8)
      },
});


class TeamCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.state={expanded:false,UpperCase:''};
        let strName=this.props.name.toUpperCase();
        this.props.name !== ''?this.state.UpperCase=this.props.name.toUpperCase()[0]:this.state.UpperCase="";
    }
    handleExpandClick(){
          this.setState((prevState) => ({expanded:!prevState.expanded}));
    }
    render()
    {
        return (
    <Card className={this.props.classes.root}>
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
    //     }
        title={this.props.name}
        subheader={this.props.role}
      />
     
      <CardContent>
        <Typography paragraph className={this.props.classes.paragraph}>
        mail:{this.props.mail}
        </Typography>
        <Typography paragraph className={this.props.classes.paragraph}>
       {/* number:0549494949*/}
        </Typography>

      </CardContent>

      <CardActions disableSpacing>
       
     {/*<IconButton aria-label="share">
          <ShareIcon />
    </IconButton>*/}
     
     {
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
        }
      </CardActions>


      {/*<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Heat
          </Typography>
        </CardContent>
      </Collapse>*/}
    </Card>
          );
        }
    
}

export default withStyles(styles)(TeamCard);