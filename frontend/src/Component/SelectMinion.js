
import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import {
    AddBox,
    ArrowDownward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,


}from '@material-ui/icons';

import { Alert, AlertTitle } from '@material-ui/lab';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) =>  <Edit {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
 export default function SelectMinion() {
    const [open, setOpen] = React.useState(false);
    function clickOpen (){
        setOpen(!open)
    }
  
    return (
        <div>
      <MaterialTable
      title='minions'
        icons={tableIcons}
        columns={[
          { title: 'Name', field: 'name' },
        ]}
        data={[
          { name: 'Mehmet' },
          { name: 'Zerya Betül' },
        ]} 
        options={{
            selection: true
          }}       
        actions={[
          {
           
            icon: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            tooltip: 'Save Minions',
           onClick: (event, rowData) => {clickOpen()}
            
            
          }
        ]}
      />
      {
    //     open? 
    //     (<Alert severity="success">
    //     <AlertTitle>Success</AlertTitle>
    //     This is a success alert — <strong>check it out!</strong>
    //   </Alert>)
    //   :<div></div>

    }
    </div>
    );
  }

































// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import Checkbox from '@material-ui/core/Checkbox';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: 'auto',
//   },
//   cardHeader: {
//     padding: theme.spacing(1, 2),
//   },
//   list: {
//     width: 200,
//     height: 230,
//     backgroundColor: theme.palette.background.paper,
//     overflow: 'auto',
//   },
//   button: {
//     margin: theme.spacing(0.5, 0),
//   },
// }));

// function not(a, b) {
//   return a.filter((value) => b.indexOf(value) === -1);
// }

// function intersection(a, b) {
//   return a.filter((value) => b.indexOf(value) !== -1);
// }

// function union(a, b) {
//   return [...a, ...not(b, a)];
// }

// export default function SelectMinion() {
//   const classes = useStyles();
//   const [checked, setChecked] = React.useState([]);
//   const [left, setLeft] = React.useState([0, 1, 2, 3]);
//   const [right, setRight] = React.useState([4, 5, 6, 7]);

//   const leftChecked = intersection(checked, left);
//   const rightChecked = intersection(checked, right);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   const numberOfChecked = (items) => intersection(checked, items).length;

//   const handleToggleAll = (items) => () => {
//     if (numberOfChecked(items) === items.length) {
//       setChecked(not(checked, items));
//     } else {
//       setChecked(union(checked, items));
//     }
//   };

//   const handleCheckedRight = () => {
//     setRight(right.concat(leftChecked));
//     setLeft(not(left, leftChecked));
//     setChecked(not(checked, leftChecked));
//   };

//   const handleCheckedLeft = () => {
//     setLeft(left.concat(rightChecked));
//     setRight(not(right, rightChecked));
//     setChecked(not(checked, rightChecked));
//   };

//   const customList = (title, items) => (
//     <paper>
//       <CardHeader
//         className={classes.cardHeader}
//         avatar={
//           <Checkbox
//             onClick={handleToggleAll(items)}
//             checked={numberOfChecked(items) === items.length && items.length !== 0}
//             indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
//             disabled={items.length === 0}
//             inputProps={{ 'aria-label': 'all items selected' }}
//           />
//         }
//         title={title}
//         subheader={`${numberOfChecked(items)}/${items.length} selected`}
//       />
//       <Divider />
//       <List className={classes.list} dense component="div" role="list">
//         {items.map((value) => {
//           const labelId = `transfer-list-all-item-${value}-label`;

//           return (
//             <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
//               <ListItemIcon>
//                 <Checkbox
//                   checked={checked.indexOf(value) !== -1}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{ 'aria-labelledby': labelId }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={`List item ${value + 1}`} />
//             </ListItem>
//           );
//         })}
//         <ListItem />
//       </List>
//     </Card>
//   );

//   return (
//     <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
//       <Grid item>{customList('Choices', left)}</Grid>
//       <Grid item>
//         <Grid container direction="column" alignItems="center">
//           <Button
//             variant="outlined"
//             size="small"
//             className={classes.button}
//             onClick={handleCheckedRight}
//             disabled={leftChecked.length === 0}
//             aria-label="move selected right"
//           >
//             &gt;
//           </Button>
//           <Button
//             variant="outlined"
//             size="small"
//             className={classes.button}
//             onClick={handleCheckedLeft}
//             disabled={rightChecked.length === 0}
//             aria-label="move selected left"
//           >
//             &lt;
//           </Button>
//         </Grid>
//       </Grid>
//       <Grid item>{customList('Chosen', right)}</Grid>
//     </Grid>
//   );
// }
