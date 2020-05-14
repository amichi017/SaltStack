import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Graph from './Component/Graph';
import SearchTime from './Component/SearchTime';
import Table from './Component/Table';
import MinionCard from './Component/MinionCard';
import { saltReturns } from './actions/date';
import store from './store';
import { Logout } from './Component/auth/Logout';
import { withStyles } from "@material-ui/core/styles";
import SimCardIcon from '@material-ui/icons/SimCard';

import SaltStack from './Component/SaltStack';
import CurrentMonth from './Component/CurrentMonth';
import CurrentYear from './Component/CurrentYear';
import LastThreeMonths from './Component/LastThreeMonths';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
 //while(store.getState().saltReturns.saltReturns===null);
const drawerWidth = 240;
store.dispatch(saltReturns());
const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    paddingRight: theme.spacing(3.5),
    paddingTop:theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    // marginLeft:theme.spacing(0),
    // marginTop:theme.spacing(4),
    paddingRight: 3.5,
    paddingTop:1,
    paddingLeft:1,
    paddingBottom: 3,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  
  },
  fixedHeight: {
    height: 240,
  },
  Logout:{
   
  },
  AccountCircleIcon:{
  
  },
  NotificationsIcon:{
    display:'flex',
    justifyContent:'space-between',
    width:43
  }
});
class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
      this.handleDrawerClose = this.handleDrawerClose.bind(this);
      this.SelectMenu = this.SelectMenu.bind(this);
      this.state={open:true,menu:"Dashboard"};
  }
  
 

  handleDrawerOpen = () => {
    this.setState({open:true});
  };
  handleDrawerClose = () => {
    this.setState({open:false});
  };
 
  SelectMenu = (str) => {
    this.setState({menu:str});
  };
  render(){  
    const fixedHeightPaper = clsx(this.props.classes.paper, this.props.classes.fixedHeight);

    if(this.state.menu==='Dashboard')
    {
      return (
        <div className={this.props.classes.root}>
    
          <CssBaseline />
          <AppBar position="absolute" className={clsx(this.props.classes.appBar, this.state.open && this.props.classes.appBarShift)}>
    
            <Toolbar className={this.props.classes.toolbar}>
          
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.menuButtonHidden)}
              >
    
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
                Dashboard
              </Typography>
              
             

                <IconButton color="inherit" className={this.props.classes.NotificationsIcon}>
                  <Badge badgeContent={4} color="secondary">
                 
                    <NotificationsIcon />
                  </Badge>
                  {/*<AccountCircleIcon />*/}
                </IconButton>

                <Logout />
             
            
            
         
    
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={this.props.classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
    
            <ListItem button
            onClick={()=>{this.SelectMenu('Dashboard')}}
            >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button
          onClick={()=>{this.SelectMenu('SaltStack')}}
          >
            <ListItemIcon>
            <SimCardIcon />
            </ListItemIcon>
            <ListItemText primary="SaltStack" />
          </ListItem>
          <ListItem button
          onClick={()=>{this.SelectMenu('Customers')}}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button
          onClick={()=>{this.SelectMenu('Reports')}}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button
          onClick={()=>{this.SelectMenu('Integrations')}}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
          </ListItem>
            </List>
            <Divider />
            <ListSubheader inset>Saved reports</ListSubheader>
            <List>
            <ListItem button   onClick={()=>{this.SelectMenu('Current month')}}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
          </ListItem>
          <ListItem button   onClick={()=>{this.SelectMenu('Last three months')}}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last three months" />
          </ListItem>
          <ListItem button   onClick={()=>{this.SelectMenu('Current year')}}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current year" />
          </ListItem>
            
            
            
            </List>
          </Drawer>
          <main className={this.props.classes.content}>
            <div className={this.props.classes.appBarSpacer} />
            <Container maxWidth="lg" className={this.props.classes.container}>
              <Grid container spacing={3}>
                {/* Graph */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Graph />
                  </Paper>
                </Grid>
                {/* Recent SearchTime */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <SearchTime />
                  </Paper>
                </Grid>
                {/* Recent Table */}
                <Grid item xs={20}>
                  <div className={this.props.classes.paper}>
                    <Table />
                  </div>
                </Grid>
              </Grid>
            </Container>
       
    
          </main>
    
        </div>
      );
    }
      else if (this.state.menu==='SaltStack'){

        return (
          <div className={this.props.classes.root}>
      
            <CssBaseline />
            <AppBar position="absolute" className={clsx(this.props.classes.appBar, this.state.open && this.props.classes.appBarShift)}>
      
            <Toolbar className={this.props.classes.toolbar}>
          
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.menuButtonHidden)}
            >
  
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
              Dashboard
            </Typography>
            
           

              <IconButton color="inherit" className={this.props.classes.NotificationsIcon}>
                <Badge badgeContent={4} color="secondary">
               
                  <NotificationsIcon />
                </Badge>
                {/*<AccountCircleIcon />*/}
              </IconButton>

              <Logout />
           
          
          
       
  
          </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={this.props.classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
      
              <ListItem button
              onClick={()=>{this.SelectMenu('Dashboard')}}
              >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button
            onClick={()=>{this.SelectMenu('SaltStack')}}
            >
              <ListItemIcon>
                <SimCardIcon />
              </ListItemIcon>
              <ListItemText primary="SaltStack" />
            </ListItem>
            <ListItem button
            onClick={()=>{this.SelectMenu('Customers')}}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button
            onClick={()=>{this.SelectMenu('Reports')}}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button
            onClick={()=>{this.SelectMenu('Integrations')}}
            >
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>
              </List>
              <Divider />

              <ListSubheader inset>Saved reports</ListSubheader>

              <List>
              <ListItem button   onClick={()=>{this.SelectMenu('Current month')}}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItem>
            <ListItem button   onClick={()=>{this.SelectMenu('Last three months')}}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last three months" />
            </ListItem>
            <ListItem button   onClick={()=>{this.SelectMenu('Current year')}}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current year" />
            </ListItem>
              
              
              
              </List>





            </Drawer>

            <main className={this.props.classes.content}>
              <div className={this.props.classes.appBarSpacer} />
              <Container maxWidth="lg" className={this.props.classes.container}>

              <Grid item  xs >
              <div className={this.props.classes.table}>
                  <SaltStack/>
              </div>
   
                </Grid>

              </Container>
            </main>
      
          </div>
        );}



        else if (this.state.menu==='Current month'){

          return (
            <div className={this.props.classes.root}>
        
              <CssBaseline />
              <AppBar position="absolute" className={clsx(this.props.classes.appBar, this.state.open && this.props.classes.appBarShift)}>
        
              <Toolbar className={this.props.classes.toolbar}>
            
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.menuButtonHidden)}
              >
    
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
                Dashboard
              </Typography>
              
             
  
                <IconButton color="inherit" className={this.props.classes.NotificationsIcon}>
                  <Badge badgeContent={4} color="secondary">
                 
                    <NotificationsIcon />
                  </Badge>
                  {/*<AccountCircleIcon />*/}
                </IconButton>
  
                <Logout />
             
            
            
         
    
            </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
                }}
                open={this.state.open}
              >
                <div className={this.props.classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
        
                <ListItem button
                onClick={()=>{this.SelectMenu('Dashboard')}}
                >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('SaltStack')}}
              >
                <ListItemIcon>
                  <SimCardIcon />
                </ListItemIcon>
                <ListItemText primary="SaltStack" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('Customers')}}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('Reports')}}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('Integrations')}}
              >
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
              </ListItem>
                </List>
                <Divider />
  
                <ListSubheader inset>Saved reports</ListSubheader>
  
                <List>
                <ListItem button   onClick={()=>{this.SelectMenu('Current month')}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
              </ListItem>
              <ListItem button   onClick={()=>{this.SelectMenu('Last three months')}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last three months" />
              </ListItem>
              <ListItem button   onClick={()=>{this.SelectMenu('Current year')}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current year" />
              </ListItem>
                
                
                
                </List>
  
  
  
  
  
              </Drawer>
  
              <main className={this.props.classes.content}>
                <div className={this.props.classes.appBarSpacer} />
                <Container maxWidth="lg" className={this.props.classes.container}>
  
                <Grid item  xs >
                <div className={this.props.classes.table}>
                    <CurrentMonth/>
                </div>
     
                  </Grid>
  
                </Container>
              </main>
        
            </div>
          );
              }

              
        else if (this.state.menu==='Current year'){

          return (
            <div className={this.props.classes.root}>
        
              <CssBaseline />
              <AppBar position="absolute" className={clsx(this.props.classes.appBar, this.state.open && this.props.classes.appBarShift)}>
        
              <Toolbar className={this.props.classes.toolbar}>
            
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.menuButtonHidden)}
              >
    
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
                Dashboard
              </Typography>
              
             
  
                <IconButton color="inherit" className={this.props.classes.NotificationsIcon}>
                  <Badge badgeContent={4} color="secondary">
                 
                    <NotificationsIcon />
                  </Badge>
                  {/*<AccountCircleIcon />*/}
                </IconButton>
  
                <Logout />
             
            
            
         
    
            </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
                }}
                open={this.state.open}
              >
                <div className={this.props.classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List>
        
                <ListItem button
                onClick={()=>{this.SelectMenu('Dashboard')}}
                >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('SaltStack')}}
              >
                <ListItemIcon>
                  <SimCardIcon />
                </ListItemIcon>
                <ListItemText primary="SaltStack" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('Customers')}}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('Reports')}}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem button
              onClick={()=>{this.SelectMenu('Integrations')}}
              >
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
              </ListItem>
                </List>
                <Divider />
  
                <ListSubheader inset>Saved reports</ListSubheader>
  
                <List>
                <ListItem button   onClick={()=>{this.SelectMenu('Current month')}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
              </ListItem>
              <ListItem button   onClick={()=>{this.SelectMenu('Last three months')}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last three months" />
              </ListItem>
              <ListItem button   onClick={()=>{this.SelectMenu('Current year')}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current year" />
              </ListItem>
                
                
                
                </List>
  
  
  
  
  
              </Drawer>
  
              <main className={this.props.classes.content}>
                <div className={this.props.classes.appBarSpacer} />
                <Container maxWidth="lg" className={this.props.classes.container}>
  
                <Grid item  xs >
                <div className={this.props.classes.table}>
                    <CurrentYear/>
                </div>
     
                  </Grid>
  
                </Container>
              </main>
        
            </div>
          );
              }




              else {

                return (
                  <div className={this.props.classes.root}>
              
                    <CssBaseline />
                    <AppBar position="absolute" className={clsx(this.props.classes.appBar, this.state.open && this.props.classes.appBarShift)}>
              
                    <Toolbar className={this.props.classes.toolbar}>
                  
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleDrawerOpen}
                      className={clsx(this.props.classes.menuButton, this.state.open && this.props.classes.menuButtonHidden)}
                    >
          
                      <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={this.props.classes.title}>
                      Dashboard
                    </Typography>
                    
                   
        
                      <IconButton color="inherit" className={this.props.classes.NotificationsIcon}>
                        <Badge badgeContent={4} color="secondary">
                       
                          <NotificationsIcon />
                        </Badge>
                        {/*<AccountCircleIcon />*/}
                      </IconButton>
        
                      <Logout />
                   
                  
                  
               
          
                  </Toolbar>
                    </AppBar>
                    <Drawer
                      variant="permanent"
                      classes={{
                        paper: clsx(this.props.classes.drawerPaper, !this.state.open && this.props.classes.drawerPaperClose),
                      }}
                      open={this.state.open}
                    >
                      <div className={this.props.classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                          <ChevronLeftIcon />
                        </IconButton>
                      </div>
                      <Divider />
                      <List>
              
                      <ListItem button
                      onClick={()=>{this.SelectMenu('Dashboard')}}
                      >
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button
                    onClick={()=>{this.SelectMenu('SaltStack')}}
                    >
                      <ListItemIcon>
                        <SimCardIcon />
                      </ListItemIcon>
                      <ListItemText primary="SaltStack" />
                    </ListItem>
                    <ListItem button
                    onClick={()=>{this.SelectMenu('Customers')}}
                    >
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Customers" />
                    </ListItem>
                    <ListItem button
                    onClick={()=>{this.SelectMenu('Reports')}}
                    >
                      <ListItemIcon>
                        <BarChartIcon />
                      </ListItemIcon>
                      <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button
                    onClick={()=>{this.SelectMenu('Integrations')}}
                    >
                      <ListItemIcon>
                        <LayersIcon />
                      </ListItemIcon>
                      <ListItemText primary="Integrations" />
                    </ListItem>
                      </List>
                      <Divider />
        
                      <ListSubheader inset>Saved reports</ListSubheader>
        
                      <List>
                      <ListItem button   onClick={()=>{this.SelectMenu('Current month')}}>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Current month" />
                    </ListItem>
                    <ListItem button   onClick={()=>{this.SelectMenu('Last three months')}}>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Last three months" />
                    </ListItem>
                    <ListItem button   onClick={()=>{this.SelectMenu('Current year')}}>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Current year" />
                    </ListItem>
                      
                      
                      
                      </List>
        
        
        
        
        
                    </Drawer>
        
                    <main className={this.props.classes.content}>
                      <div className={this.props.classes.appBarSpacer} />
                      <Container maxWidth="lg" className={this.props.classes.container}>
        
                      <Grid item  xs >
                      <div className={this.props.classes.table}>
                          <LastThreeMonths/>
                      </div>
           
                        </Grid>
        
                      </Container>
                    </main>
              
                  </div>
                );
                    }
              
              
}


}

export default withStyles(styles)(Dashboard);