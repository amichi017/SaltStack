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
    minWidth: 275,
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
   
       this.state={ 
          open: false,
          defer: false 
        };
    }

  
render(){
   
    const bull = <span className={this.props.classes.bullet}>•</span>;
    return (
     
        <Card className={this.props.classes.root}>
          <CardContent>
            <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
            fun: state.apply
            {/*this.props.fun*/}
             
            </Typography>
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
                   <div>Outside NoSsr</div>
                   <NoSsr defer={this.state.defer}>
                     .....Inside NoSsr
                     <LargeTree />
                   </NoSsr>
                 </React.Fragment>
               ) : null}
             </div>
               </div>


            </Typography>
            <Typography variant="h5" component="h2">
            {/*this.props.minion*/}
         </Typography>
          {/*button*/}
          </CardContent>
          <CardActions>
      
          </CardActions>
        </Card>
       
      );
}
  
}

export default withStyles(styles)(MinionCard);


// <Button
// variant="outlined"
//  color="secondary"
// className={this.props.classes.button}
// startIcon={<DeleteIcon />}
// >
// Delete
// </Button>


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import NoSsr from '@material-ui/core/NoSsr';

// const useStyles = makeStyles({
//   container: {
//     width: 300,
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
// });

// function LargeTree() {
//   return Array.from(new Array(5000)).map((_, index) => <span key={index}>.</span>);
// }

// export default function FrameDeferring() {
//   const classes = useStyles();
//   const [state, setState] = React.useState({ open: false, defer: false });

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={() =>
//           setState({
//             open: !state.open,
//             defer: false,
//           })
//         }
//       >
//         {'Render NoSsr defer="false"'}
//       </button>
//       <br />
//       <button
//         type="button"
//         onClick={() =>
//           setState({
//             open: !state.open,
//             defer: true,
//           })
//         }
//       >
//         {'Render NoSsr defer="true"'}
//       </button>
//       <br />
//       <br />
//       <div className={classes.container}>
//         {state.open ? (
//           <React.Fragment>
//             <div>Outside NoSsr</div>
//             <NoSsr defer={state.defer}>
//               .....Inside NoSsr
//               <LargeTree />
//             </NoSsr>
//           </React.Fragment>
//         ) : null}
//       </div>
//     </div>
//   );
// }