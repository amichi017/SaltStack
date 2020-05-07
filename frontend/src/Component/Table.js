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


const time =(str)=>{
    const year =str.slice(0,4);
    const month =String(parseInt(str.slice(4,6))-1);
    const day =str.slice(6,8);
    const hower= str.slice(8,10);

    const minet=str.slice(10,12);
    return String(hower)+":"+String(minet);

}

const  date=(str)=>{
    const year =str.slice(0,4);
    const month =String(parseInt(str.slice(4,6))-1);
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
            color:(x==='Succeeded')?'#208000':'#ff0000'})

    },
    { title: 'Name', field: 'name',
    },
    { title: 'Date', field: 'date' },
    { title: 'Time', field: 'time',
        //type: 'time'
    },



]

const dataTable=[
    {
        status: 'Faile',
        name: 'sm-stud.jce.ac.il',
        date: date('20191205040346780161'),
        time: time('20191205040346780161'),
    },
]

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
        }
    }
    selestMinion(event, rowData){
        console.log(rowData, " equl");
        let res = store.getState().saltReturns.saltReturns
            .filter((item)=>{if((item.full_ret.success===false) && (item._id === rowData.id))
            { this.setState({dialogOpen:true,minion:item}); return item;}})


    }
    handleClickOpen () {
        this.setState({dialogOpen:true});
    };

    handleClose () {
        this.setState({dialogOpen:false});
    };
    componentWillReceiveProps(nextProps,nextState) {

        // console.log(store.getState(),";;;;;;;;;;");
        const start=store.getState().date.start;
        const end=store.getState().date.end;
        if(nextProps.saltReturns!==this.props.saltReturns || (((this.props.date.start.toLocaleDateString()!== nextProps.date.start.toLocaleDateString()) || (this.props.date.end.toLocaleDateString()!== nextProps.date.end.toLocaleDateString() )))){
            console.log(this.props.saltReturns, 'this.props.saltReturns')
            this.state.saltReturns=nextProps.saltReturns.saltReturns.filter((item)=>{return item.full_ret.fun === "state.apply"}).filter((item)=>{
                let str=item.jid.slice(0,4)+"-"+ String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
                let time=new Date(str);
                if(time >= start && time<= end){return item;}
            }).map((item)=>{

                return {

                    status:(item.full_ret.success === true)?'Succeeded':'Faile',
                    name:item.minion,
                    date:date(item.full_ret.jid),
                    id:item._id,
                    time: time(item.full_ret.jid),

                    // return:item.return
                };}
            )
            this.state.Returns=nextProps.saltReturns.saltReturns.map((item)=>{
                return{Returns:item.full_ret.return}
            })

            // console.log(store.getState());
            // this.setState({saltReturns:nextProps.saltReturns});
            // console.log(this.state.Returns,"kkkkkkkkkkkkkkkk")

        }
    }

    render(){

        return (
            <div>
                <MaterialTable
                    title="Minion Table"
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
                    maxWidth="sm"
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
                            {console.log(this.state.minion,"comment")}
                        </Typography>
                    </DialogTitle>


                    <DialogContent dividers>
                        <div style={{minWidth: 500,}}>
                            <div>
                                <Typography style={{fontSize: 14,}} color="textSecondary" gutterBottom>
                                    _id : {this.state.minion._id}
                                </Typography>
                                <Typography style={{fontSize: 14,}} color="textSecondary" gutterBottom>

                                </Typography>
                                <CardActions>

                                </CardActions>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            סגור
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


export default connect(mapStateToProps)(Orders);
