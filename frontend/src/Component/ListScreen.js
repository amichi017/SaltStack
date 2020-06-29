import React from 'react';
import {
        ListItem,
        ListItemIcon,
        ListItemText,
        ListSubheader
 }from '@material-ui/core/';

 import DashboardIcon from '@material-ui/icons/Dashboard';
 import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
 import PeopleIcon from '@material-ui/icons/People';
 import BarChartIcon from '@material-ui/icons/BarChart';
 import LayersIcon from '@material-ui/icons/Layers';
 import AssignmentIcon from '@material-ui/icons/Assignment';


export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current year" />
    </ListItem>
  </div>
);