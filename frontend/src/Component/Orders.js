	

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

  { 
    status: 'Succeeded',
    name: 'sm-stud.jce.ac.il',
    id: '5de92aa9441a1f0c7973a234',
    time: time('20191205180434320550'),
    
  },
 
  { 
    status: 'Succeeded',
    name: 'sm01-stud.jce.ac.il',
    id: '5de92ad69679def1a498c9cd',
    time:time( '20191205190523839870'),
    
   
  },
  { 
    status: 'Succeeded',
    name: 'sm-stud.jce.ac.il',
    id: '5de92aa9441a1f0c7973a234',
    time: time('20191205150434320550'),
    
  },
  { 
    status: 'Faile', 
    name: 'sm02-stud.jce.ac.il',
    id: '5de92ad77bbe630a5f637993',
    time: time('20191205020523839870'),

  },
  { 
    status: 'Faile',
    name: 'sm-stud.jce.ac.il',
    id: '5de92adbe85659e221390bef',
    time: time('20191205120523839870'),
    
  } ,
  { 
    status: 'Faile', 
    name: 'sm02-stud.jce.ac.il',
    id: '5de92ad77bbe630a5f637993',
    time: time('20191205170523839870'),

  },
    
 
]



 class Orders extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      selectedRow: null
    }
  }
  
render(){
  return (
    <MaterialTable
    title="minion_table"
    columns={dataColumns}
    data={ dataTable}
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
          onClick: (event, rowData) => {console.log(  rowData.surname); console.log(this.props.date,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');}
        }
      ]
      }
    />
  );

}
}

const mapStateToProps = (state, ownProps) => {
  return {
    date: state.date
  }
}

export default connect(mapStateToProps)(Orders);