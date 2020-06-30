import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MaterialTable from 'material-table';
import {SALT_RETURNS} from "../actions/types";
import store from '../store';
import { saltReturns } from '../actions/date';
import { forwardRef } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { withStyles } from "@material-ui/core/styles";
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
//import data from './f.json';
import data from '../Component/test.json';

const time =(str)=>{
    const hower= str.slice(8,10);
    const minet=str.slice(10,12);
    return String(hower)+":"+String(minet);

}

const  date=(str)=>{
    const year =str.slice(0,4);
    const month =String(parseInt(str.slice(4,6)));
    const day =str.slice(6,8);
   
    return String(day)+"/"+String(month)+"/"+String(year);

}
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
const dataColumns =[
    { title: 'status', field: 'status',
        //type: 'boolean'
        cellStyle: x=>({
            color:(x==='Success')?'#208000':'#ff0000'})

    },
    { title: 'Name', field: 'name',
    },
    { title: 'Date', field: 'date' },
    { title: 'Time', field: 'time',
        //type: 'time'
    },



]

const dataTable=[]
const styles = theme => ({
    root:{
        height: 240,
        flexGrow: 1,
        maxWidth: 900,
        fontSize: 20,
        
    },
  //  TreeStyle: ,
      text:{
        paddingLeft: theme.spacing(6),
        fontSize: 16,
       

      },
      title:{
        fontSize: 16,
        paddingLeft:theme.spacing(2)
      },
      TreeItem:{
        marginTop:theme.spacing(3.5),
        flexGrow: 1,
        maxWidth: 950,
        fontSize: 18,
      },
      TreeItemText:{
        fontSize: 18,
      },
      
});
//console.log(data,'cccccccccccccccccccccccccccccccccccccccccc')
// const m=JSON.parse("'["+data+"]'");
const x=Object.entries(data[0].return).map((e) => ( { [e[0]]: e[1] } ));
//console.log(data,'data');
//console.log(Object.entries(data[0].return),'llll')
//console.log(x,'cccccccccccccccccccccccccccccccccccccccccc')
class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.selestMinion=this.selestMinion.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        store.dispatch(saltReturns());

        this.state = {
            saltReturns: dataTable,
            Returns:null,
            dialogOpen:false,
            minion:"",
            data:[],
            flag:false,
        }
       
    }
 
    componentWillMount(){
       // console.log('componentWillMount');
        if(store.getState().saltReturns.saltReturns!==null)
        {
            setTimeout(()=>{  
                const start=store.getState().date.start;
                let startTemp=new Date(start.getTime());
            
                startTemp.setHours(0,0,0);
                const end=store.getState().date.end;
                let endTemp=new Date(end.getTime());
            
            // console.log(endTemp,'new Date(end.getTime());')
            // console.log(start,'store.getState().date.start;')
                let saltTemp=store.getState().saltReturns.saltReturns
                // .filter((item)=>{return item.full_ret.fun === "state.apply"})
                // .filter((item)=>{
                //     let str=item.jid.slice(0,4)+"-"+ String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
                //     let time=new Date(str);
                //     if(time >= startTemp && time<= endTemp){return item;}
                // })
                .map((item)=>{
                    let res=true;
                    //if(item.full_ret.success === false){res=false}
                    let temp =Object.entries(item.return);
                    if(Array.isArray(item.return)){ res=true}
                    else{
                       // console.log(item,'item');
                        let dataTemp=Object.entries(item.return).map((e) => ( { [e[0]]: e[1] } ));
                        let flag=false;
                        dataTemp.forEach(item =>{
                           // console.log(Object.values(item),'Object.values(item)');
                            if((Object.values(item)[0].result===true)&& (flag===false)){res=true}
                            else{res=false;flag=true;}
                        } )
                    }
                    return {
        
                        status:(res=== true)?'Success':'Fail',
                        name:item.minion,
                        date:date(item.jid),
                        id:item._id,
                        time: time(item.jid),
        
                        // return:item.return
                    };}
                )
            
                this.setState({saltReturns:saltTemp});
            // console.log(this.state.saltReturns,'setTimeout(()=>{this.setState({saltReturns:saltTemp});}, 600);');
            }, 500);
            //setTimeout(()=>{;}, 1000);
        }
    }
    selestMinion(event, rowData){
        console.log("table - 213");
        //console.log(rowData, " equl");
        if(rowData.status==='Success'){return}
        let res = store.getState().saltReturns.saltReturns
            .filter((item)=>{
            //if((item.full_ret.success===false) && (item._id === rowData.id))
            if((item._id === rowData.id))

                     { 
                         let temp =Object.entries(item.return);
                         if(temp[0][0]==="0"){ 
                             this.setState({flag:true,data:temp[0]});
                             console.log("table - 225");
                            }
                         else{
                             let res=Object.entries(item.return).map((e) => ( { [e[0]]: e[1] } ));
                             this.setState({data:res})
                             console.log("table - 230");
                             }
                         this.setState({dialogOpen:true,minion:item});
                         console.log("table - 230");
                         return item;
                    }
                
            
            })


    }
    handleClickOpen () {
        this.setState({dialogOpen:true});
    };

    handleClose () {
        this.setState({dialogOpen:false});
    };
    componentWillReceiveProps(nextProps,nextState) {
        //console.log('componentWillReceiveProps');
        // console.log(store.getState(),";;;;;;;;;;");
        if(store.getState().saltReturns.saltReturns!==null)
        {
            setTimeout(()=>{  
                const start=store.getState().date.start;
                let startTemp=new Date(start.getTime());
            
                startTemp.setHours(0,0,0);
                const end=store.getState().date.end;
                let endTemp=new Date(end.getTime());
            
            // console.log(endTemp,'new Date(end.getTime());')
            // console.log(start,'store.getState().date.start;')
                let saltTemp=store.getState().saltReturns.saltReturns
                // .filter((item)=>{return item.full_ret.fun === "state.apply"})
                // .filter((item)=>{
                //     let str=item.jid.slice(0,4)+"-"+ String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
                //     let time=new Date(str);
                //     if(time >= startTemp && time<= endTemp){return item;}
                // })
                .map((item)=>{
                    let res=true;
                    let temp =Object.entries(item.return);
                    if(Array.isArray(item.return)){ res=true}
                    else{
                      //  console.log(item,'item');
                        let dataTemp=Object.entries(item.return).map((e) => ( { [e[0]]: e[1] } ));
                        let flag=false;
                        dataTemp.forEach(item =>{
                           // console.log(Object.values(item),'Object.values(item)');
                            if((Object.values(item)[0].result===true)&& (flag===false)){res=true}
                            else{res=false;flag=true;}
                        } )
                    }
                    return {
        
                        status:(res=== true)?'Success':'Fail',
                        name:item.minion,
                        date:date(item.jid),
                        id:item._id,
                        time: time(item.jid),
        
                        // return:item.return
                    };}
                )
            
                this.setState({saltReturns:saltTemp});
            // console.log(this.state.saltReturns,'setTimeout(()=>{this.setState({saltReturns:saltTemp});}, 600);');
            }, 500);
            //setTimeout(()=>{;}, 1000);
        }



    }
    // componentWillUpdate() {
  
    // }
    render(){

        return (
            <div>
                <MaterialTable
                    title="Minions Table"
                    columns={dataColumns}
                    data={ this.state.saltReturns}
                    icons={tableIcons}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}


                    options={{
                        exportButton: true,
                        filtering: true,

                        //rowStyle: rowData => ({
                        // color: (rowData.name==='su') ? '#daa9d9' : '#ff1a1a'})

                    }}
                    actions={[
                        {

                            icon: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                            tooltip: 'Save User',
                            onClick: (event, rowData) => {this.selestMinion(event, rowData)}
                        }
                    ]
                    }
                />

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}

                    aria-describedby="alert-dialog-description"
                    maxWidth="lg"
                    scroll="paper"
                    aria-labelledby="confirmation-dialog-title"
                >

                    <DialogTitle id="alert-dialog-title">

                        <Typography style={{color:"#ff6666",fontSize:18} }>
                            {"Failed "}
                            {this.state.minion.minion}
                            {" at date "}
                            {   (this.state.minion !== undefined )? (date(String(this.state.minion.jid))): " "}
                            {' at hour '}
                            {(this.state.minion !== undefined )? (time(String(this.state.minion.jid))): " "}
                            {//console.log(this.state.minion,"comment")}
                             }
                        </Typography>
                    </DialogTitle>


                    <DialogContent dividers>
                    {//if you want to chenge width with 
                    }
                        <div style={{minWidth: 1000,}}>
                            <div>
                             

                              
                                <TreeView
                                style={{
                                   
                                    fontSize:18,
                                }}
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                >
                                 {this.state.data.map((item,index)=>{
                                        if(this.state.flag===false){
                                            return (
                                                <Typography  className={this.props.classes.TreeItem} > 
                                                        <TreeItem 
                                                        nodeId={index} 
                                                        label={Object.keys(item)[0]} 
                                                        style={{
                                                            color:(Object.values(item)[0].result===true)?'#26a852':"#ff6666",
                                                            fontSize:18,
                                                        }}
                                                        className={this.props.classes.TreeItemText}> 
    
                                                            {console.log("table - 394")}
                                                            
                                                            <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                                                            comment : 
                                                            
                                                            </Typography>
    
                                                            <Typography color="textSecondary" className={this.props.classes.text}>{(Object.values(item)[0]).comment}</Typography>
    
                                                            
                                                            <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                                                             changes :
                                                            </Typography>
    
                                                            <Typography color="textSecondary" className={this.props.classes.text}>{(String(Object.values(item)[0]).changes)}</Typography>
    
                                                            <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                                                              _id_ : 
                                                            </Typography>
    
                                                            <Typography color="textSecondary" className={this.props.classes.text}>{(Object.values(item)[0])._id_}</Typography>
                                               
                                                        </TreeItem>
                                                    </Typography>
                                                       )
                                        }
                                        else{
                                            if(index===1){
                                                return(
                                                    <Typography  color="textSecondary" gutterBottom>
                                                                  return : {this.state.minion.return}
                                                    </Typography>
                                                )
                                            }
                                           
                                        }
                                           

                                 })}
                                 </TreeView>
                       
                                <CardActions>

                                </CardActions>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                          close
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>

        );

    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        saltReturns: state.saltReturns,
        date: state.date
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({saltReturns: saltReturns}, dispatch);
}



export default connect(mapStateToProps)(withStyles(styles)(Orders));