	
import axios from 'axios';
import React, { Component } from "react";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MaterialTable from 'material-table';
import {SALT_RETURNS} from "../actions/types";
import store from '../store';
import { saltReturns } from '../actions/date';
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
  ViewColumn
}from '@material-ui/icons';


const time =(str)=>{
  const year =str.slice(0,4);
  const month =String(parseInt(str.slice(4,6))-1);
  const day =str.slice(6,8);
  const hower= str.slice(8,10);
  
  const minet=str.slice(10,12);
  return String(hower)+":"+String(minet);

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
  { title: 'ID', field: 'id' },
  { title: 'Time', field: 'time', 
  //type: 'time'
 },
  
 
 
]

const dataTable=[
  { 
    status: 'Faile',
    name: 'sm-stud.jce.ac.il',
    id: '5de92a636ff1ca1a1bcf3382',
    time: time('20191205040346780161'),
  },
]




 class Orders extends React.Component {
  constructor(props) {
    super(props);
    store.dispatch(saltReturns());
    
    this.state = {
      saltReturns: dataTable,
      Returns:null
    }
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(nextProps.saltReturns!==this.props.saltReturns){
      this.state.saltReturns=nextProps.saltReturns.saltReturns.map((item)=>{
        return {
                status:(item.full_ret.success === true)?'Succeeded':'Faile',
                name:item.minion,
                id:item._id,
                // id:item.full_ret.id,
                time: time(item.full_ret.jid),
                
                // return:item.return
               };}
          )
          this.state.Returns=nextProps.saltReturns.saltReturns.map((item)=>{
            return{Returns:item.full_ret.return}
          })

          console.log(store.getState());
      // this.setState({saltReturns:nextProps.saltReturns});
      console.log(this.state.Returns,"kkkkkkkkkkkkkkkk")
   
    }
  }

render(){

  return (
    <MaterialTable
    title="minion_table"
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
          // onClick: (event, rowData) => {console.log(  rowData.surname); console.log(this.props.date,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');}
        }
      ]
      }
    />
  );

}
}

const mapStateToProps = (state, ownProps) => {
  return {
    saltReturns: state.saltReturns,
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({saltReturns: saltReturns}, dispatch);
}


export default connect(mapStateToProps)(Orders);