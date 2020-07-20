import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import store from '../store';
import { saveMinion } from '../actions/date';
import {SAVE_MINION} from "../actions/types";
import axios from 'axios';
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
import { withAlert } from 'react-alert';
import { Alert, AlertTitle } from '@material-ui/lab';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SendIcon from '@material-ui/icons/Send';
import MinionCard from './MinionCard';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import { returnErrors } from '../actions/errorActions';
import { listMinions } from '../actions/date';
import Icon from '@material-ui/core/Icon';
import ClearIcon from '@material-ui/icons/Clear';
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


const styles = theme => ({
    MaterialTable:{
<<<<<<< HEAD
        marginLeft: theme.spacing(-15),
=======
        marginLeft: theme.spacing(-8),
>>>>>>> 00ce104ffbc429e346bb4ddc2db5d08d084aed1f
        marginTop: theme.spacing(1),
        width:450, 
    },
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 500,
      height:70,
      marginTop: theme.spacing(1)
    },
    paperParms:{
        padding: '3px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        height:50,
        marginTop: theme.spacing(3)
    },
   
    input: {
      marginLeft: theme.spacing(1),
      marginTop: 0,
      
      flex: 1,
    },
    inputparms:{
        marginLeft: theme.spacing(1),
    
        //width: 400,
        flex: 1,
    },
    minionStyle:{
        marginTop: theme.spacing(5),
        width:200
    },
   
    iconButton: {
      padding: 10,
      height:55
    },
    Divider: {
      marginTop: theme.spacing(5),
      height: 50,
      margin: 4,
    },
    iconButtonParms: {
     
        padding: 10,
        height: 10,
        width:4,
      },
      dividerParms: {
        marginTop: theme.spacing(5),
        height: '100%',
        margin: 4,
      },
    msg:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    Comments:{
        marginTop: theme.spacing(4),
    },
   
    ButtonGroup: {
        display: 'flex',
        flexDirection: 'column',
        
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },
      button: {
       //paddingRight:70,
       height:50,
      // width:60
      },
    
  });



 

class SaltStack extends React.Component {
    constructor(props) {
        super(props);
        this.clickOpen = this.clickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        //this.handleClick = this.handleClick.bind(this);
        this.sentCommand = this.sentCommand.bind(this);
        this.ClickCSend = this.ClickCSend.bind(this);
        this.getMinionsFromServer = this.getMinionsFromServer.bind(this);
        this.tokenConfig = this.tokenConfig.bind(this);
        store.dispatch(listMinions());
        this.state={
        alert:false,
        msg:false,
        menu:"Dashboard",
        open: false,
        defer: false,
        clickSave:false,
        history:[],
        input:'',
        parms:"",
        saveMinion:{},
        countSaveMinion:0,
        warninginput:false,
        warningNoMinionSelected:false,
        err_from_server_run_cmd:false,
        err_cmd:"",
        err_cmd_flag:false,
        data:[],
        minions_send_to_server:[],
        cmd_no_run_bacuse:"",
        
        };
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
       this.getMinionsFromServer();
     
       if(this.state.history.length===0){
           this.state.history=store.getState().saveMinion.saveMinion;
       }
    }
    ClickCSend(){
        if(this.state.input === ''){ 
            this.setState({warninginput:true});
            setTimeout(()=>{this.setState({warninginput:false});}, 2200);
        }
        else{
            this.sentCommand(this.state.input);
        }
       
        
    }
    getMinionsFromServer(){
       
        let tokenTemp=this.tokenConfig();
      
        axios.get('/get_connected_minions',tokenTemp)
        .then((res) => {
                let arr=[];
                for(let i=0;i<res.data.result.length;i++){
                   let minion={name:res.data.result[i]}
                   arr.push(minion);
                }             
                this.setState({data:arr})
        })
        .catch(err => {
            console.log(err,"err get_connected_minions");
    
           });
        };
        tokenConfig = () => {
            //console.log("getstatteeeeeslatl",store.getState())
            // Get token from localstorage
            const token = store.getState().auth.token;
        
            // Headers
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
        
            // If token, add to headers
            if(token) {
               config.headers["Authorization"] = ` Bearer ${token} `;
            }
        
         return config;
    };
    handleClose = (event, reason) => 
    {
        if (reason === 'clickaway') {
          return;
        }
     
        this.setState({msg:false,warninginput:false,warningNoMinionSelected:false});
    };

  
   
    clickOpen (rowData){
        //  console.log(rowData,'rowData')
        this.state.countSaveMinion=0;
        this.state.countSaveMinion++;
        const data=rowData.map((row)=>row.name);
        this.state.minions_send_to_server=data;
        let commntId=(store.getState().saveMinion.saveMinion.length)+1; 
       // this.state.saveMinion={minions:data,id:commntId,comment:'',prepared:false};
        //this.state.history.push({prepared:false,comment:'',Parameter:"",id:"",minions_send_to_server:data})
       // this.getMinionsFromServer();
      
        this.setState({alert:true,clickSave:true,});
        setTimeout(()=>{this.setState({alert:false,});}, 5000);
        
    };
    componentWillReceiveProps(nextProps,nextState) {
    
         if(nextProps.saveMinion!==this.props.saveMinion){
             setTimeout(() => {
                this.forceUpdate();
             }, 500);
           
           //console.log("if")
   
       }
   
     }
    //  componentDidUpdate(prevState){
    //     this.state.history=prevState.history;

    //  }
sentCommand(command){
        

    this.state.countSaveMinion--;
    if( (this.state.countSaveMinion===0)){
            let list_card_from_store=store.getState().saveMinion.saveMinion.length;
            console.log(store.getState(),"store.getState(");
            console.log(this.state.history,"this.state.history");
            if(list_card_from_store!== this.state.history.length){
                this.state.history=store.getState().saveMinion.saveMinion;
            }
            const config = {headers: {'Content-Type': 'application/json'}
            }
            const words = this.state.input.split(' ');
            const parms_send=this.state.parms.split(' ');
            let id_of_commnd = new Date().getTime()
            let x = {prepared:false,comment:command,Parameter:parms_send,id:id_of_commnd,minions:this.state.minions_send_to_server};
            
            this.state.input="";
            this.state.history.unshift(x)
            let res={
                func:command,
                tgt:this.state.minions_send_to_server,
                salt_cmd:this.state.parms===""?"":parms_send,
              
            }
          
            this.setState({parms:""});
           
            const body = JSON.stringify(res);
            let tokenTemp=this.tokenConfig();
            
<<<<<<< HEAD
            //console.log(" his.state.history.minions", this.state.history.minions)
=======
            console.log(" his.state.history.minions", this.state.history.minions)
>>>>>>> 00ce104ffbc429e346bb4ddc2db5d08d084aed1f
            store.dispatch({
                type: SAVE_MINION,
                payload: this.state.history
            });
          axios.post('/saltstack_cmd',body, tokenTemp)
          .then((res) => {

              const temp=res.data.res;
              let cur_minions = this.state.minions_send_to_server
              const buildRes = cur_minions.map(minion => [minion,JSON.stringify(temp[minion])])
<<<<<<< HEAD
              //console.log(this.state,"this.state 1")
             
              this.state.history =this.state.history.map((item)=>{
                      if(item.id === id_of_commnd ){
                          //console.log(item,"item")
=======
              console.log(this.state,"this.state 1")
             
              this.state.history =this.state.history.map((item)=>{
                      if(item.id === id_of_commnd ){
                          console.log(item,"item")
>>>>>>> 00ce104ffbc429e346bb4ddc2db5d08d084aed1f
                          return({prepared:true,comment:command,Parameter:parms_send,id:id_of_commnd,minions:buildRes})
                        
                      }
                      else{return item}
                  
                 
              }).filter((item)=>{if(item!==undefined){return item}})
              
             
             console.log(this.state,"this.state 2")
             store.dispatch({
                type: SAVE_MINION,
                payload: this.state.history
            });
            console.log(store.getState(),"store.getState()")
            this.setState({parms:""});
           // this.forceUpdate();
          })
          .catch(err => {
            //console.log("1111111111111111111111")
            console.log("err",err)
           
            setTimeout(() => {
                this.state.history=this.state.history.filter((item)=>{
                 
                    if(item.id !== id_of_commnd ){
                       
                        return item;
                    }
                    else{ this.state.cmd_no_run_bacuse=item.comment;}
                  })
                  
                  this.setState({err_cmd_flag:true})
                  setTimeout(()=>{this.setState({err_cmd_flag:false});}, 6500);
               
                
            }, 5000);
              

          
           // this.forceUpdate();
          })
         
          
         
        }
       
      
        else if((this.state.countSaveMinion !==0) && (this.state.countSaveMinion!==1)){ 
            console.log("pppppppppppppppppppppp")// && (this.state.countSaveMinion!==1)   
            this.setState({warningNoMinionSelected:true});
            setTimeout(()=>{this.setState({warningNoMinionSelected:false});}, 2200);
        }
        else{
           
            setTimeout(()=>{this.setState({msg:false,clickSave:false});}, 2200);
        }
        
        // if((this.state.countSaveMinion !==0) && (this.state.countSaveMinion!==1) &&(this.state.input !== '')  ){ 
        //     this.setState({warningNoMinionSelected:true});
        //     setTimeout(()=>{this.setState({warningNoMinionSelected:false});}, 2200);
        // }
       
        

    };



  render(){
  
    return (

<div style={{display: 'flex',flexDirection: 'row',}}>

<div style={{display: 'flex',flexDirection: 'column',}}>
   
    <Paper component="form" className={this.props.classes.root}>
        <IconButton className={this.props.classes.iconButton} aria-label="menu">
            <MenuIcon />
        </IconButton>
            
        <InputBase
        autoComplete
        autoFocus='true'
        value={this.state.input}
        onChange={(event)=>{this.setState({input:event.target.value})}}
        className={this.props.classes.input}
        placeholder="Command Line"
        inputProps={{ 'aria-label': 'Command Line' }}
        />
        {
            this.state.input!==""?(
                <div>
          
            <IconButton color="primary" className={this.props.classes.iconButton} aria-label="directions" onClick={()=>{this.setState({input:""})}}>
              <ClearIcon />
            </IconButton>
            </div>
            )
            :(<div></div>)
        }
        <Divider className={this.props.classes.divider} orientation="vertical" />     
        <IconButton fontSize="small" color='primary' size='medium' className={this.props.classes.iconButton} aria-label="directions" onClick={this.ClickCSend}>
            <SendIcon />
        </IconButton>
    </Paper>




{
    /////////////////////////////////////////////////////////////////////////////////////////////////
}
<div className={this.props.classes.Comments}>
    Parameters
        <Divider light  style={{width:200}}/>
    </div>


    <Paper component="form" className={this.props.classes.paperParms}>
    <InputBase
    autoComplete
    autoFocus='true'
    value={this.state.parms}
    onChange={(event)=>{this.setState({parms:event.target.value})}}
    className={this.props.classes.inputparms}
    placeholder="Parameters"
    inputProps={{ 'aria-label': 'Parameters' }}
    />
    {
    //     this.state.parms!==""?(
            
     
    //         <Divider className={this.props.classes.divider} orientation="vertical" />
       
    //     )
    //     :(<div></div>)
    }
  
    {
        this.state.parms!==""?(
            
     
        <IconButton fontSize="small" color="primary" className={this.props.classes.iconButton} aria-label="directions" onClick={()=>{this.setState({parms:""})}}>
        <ClearIcon />
      </IconButton>
       
        )
        :(<div></div>)
    }
    {
    //     <Divider orientation="vertical" flexItem/>   
    //    <Button
    //         variant="contained"
    //         color="primary"
    //         className={this.props.classes.button}
    //         //disabled
    //         //endIcon={<SendIcon />}
    //       >
    //         {//Send
    //         }
    //      </Button>
        }

    </Paper>




    <div className={this.props.classes.Comments}>
        commands
        <Divider light  style={{width:200}}/>
    </div>

    <div className={this.props.classes.ButtonGroup}>
        <ButtonGroup 
            size="large" 
            color="primary" 
            orientation="horizontal"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
            style={{ marginTop:35,width:420,height:50,}}>
           
           <Button onClick={()=>this.sentCommand('state.apply')}>state.apply</Button>
            <Button onClick={()=>this.sentCommand('test.ping')}>test.ping</Button>
            <Button onClick={()=>this.sentCommand('grains.items')}>grains.items</Button>

        

        </ButtonGroup>
        <ButtonGroup 
            size="large" 
            color="primary" 
            orientation="horizontal"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
            style={{ marginTop:15,width:380,height:50,}}>

            <Button onClick={()=>this.sentCommand('pillar.items')}>pillar.items</Button>
            <Button onClick={()=>this.sentCommand('saltutil.refresh_grains')}>saltutil.refresh_grains</Button>
           
                            
        </ButtonGroup>
        <ButtonGroup 
            size="large" 
            color="primary" 
            orientation="horizontal"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="text"
            style={{ marginTop:15,width:380,height:50,}}>
        <Button onClick={()=>this.sentCommand('saltutil.refresh_pillar')}>saltutil.refresh_pillar</Button>
        </ButtonGroup>
    </div>

    <div className={this.props.classes.Divider}>
        History
        <Divider light  style={{width:400}}/>
    </div>


    {
        <div style={{ display: 'flex',flexDirection: 'row',flexFlow: 'row wrap',maxWidth:850,width:800}}>
          {console.log(this.state.history,"this.state.history")}
        {this.state.history.map(item =>{
            return(
                
                  <MinionCard  id={item.id} minion={item.minions} comment={item.comment} prepared={item.prepared} Parameter={item.Parameter} err={this.state.err_cmd_flag}/>
        )})}
        </div>
    }  


    <div className={this.props.classes.Divider}>
        <Divider light  style={{width:400}}/>
    </div>


    </div>
<div>
  

    <div className={this.props.classes.MaterialTable}>
        {
            this.state.alert?
            (   <div className={this.props.classes.msg}>
                   
                        <Alert severity="success">
                                The minions you selected were  — <strong>accepted in the system</strong>
                        </Alert>
                   
                </div>
            ):<div></div>
        }
        <MaterialTable
        
            title='Minions'
            icons={tableIcons}
            columns={[{ title: 'Name', field: 'name' },]}
            data={this.state.data} 
            options={{selection: true}}       
            actions=
            {[{
                icon: forwardRef((props, ref) => <SaveIcon color='action' {...props} ref={ref} />),
                tooltip: 'Save Minions',
                onClick: (event, rowData) => {this.clickOpen(rowData)}
            }]}
        />
        {
            this.state.clickSave === true?
                (<div className={this.props.classes.msg}>
                    <Snackbar open={this.state.msg} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="success">
                            The commands you made were received in the system!
                        </Alert>
                    </Snackbar>
                </div>
                ):<div></div>
        }
        {
            this.state.warninginput === true ?
            (   <div className={this.props.classes.msg}>
                <Snackbar open={this.state.warninginput} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">
                          command not sent because     <strong> no command entered   </strong>
                        </Alert>
                  
                    </Snackbar>
                   
                </div>
            )
            :<div></div>
        }
        {
            this.state.warningNoMinionSelected === true ?
            (   <div className={this.props.classes.msg}>
                <Snackbar open={this.state.warningNoMinionSelected} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="warning">
                              command not sent because <strong>no minion selected   </strong>
                        </Alert>
                  
                    </Snackbar>
                   
                </div>
            )
            :<div></div>
        }
          {
            this.state.err_cmd_flag === true ?
            (   <div className={this.props.classes.msg}>
                <Snackbar open={this.state.err_cmd_flag} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                              The command  <strong>{this.state.cmd_no_run_bacuse}</strong>  not sent because <strong>Internal Server Error   </strong>
                        </Alert>
                  
                    </Snackbar>
                   
                </div>
            )
            :<div></div>
        }




    </div>

</div>
</div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
    return {
        saveMinion: state.saveMinion,
        
    }
}
  export default connect(mapStateToProps)(withStyles(styles)(SaltStack));
