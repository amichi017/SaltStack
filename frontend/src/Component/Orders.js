	

import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from 'material-table';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


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
  { title: 'Name', field: 'name',cellStyle: x=>({
    color:(x==='Succeeded')?'#208000':'#ff0000'})
  },
  { title: 'Surname', field: 'surname' },
  { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  {
    title: 'Birth Place',
    field: 'birthCity',
    lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
  },
]

const dataTable=[
  { name: 'Faile', surname: 'rtr', birthYear: 1987, birthCity: 63 },
  { name: 'Succeeded', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  { name: 'Succeeded', surname: 'rrf', birthYear: 1987, birthCity: 63 },
  { name: 'Succeeded', surname: 'ff', birthYear: 1987, birthCity: 63 },
  { name: 'Faile', surname: 'Bvvvaran', birthYear: 1987, birthCity: 63 },
  { name: 'Faile', surname: 'Bar  an', birthYear: 1987, birthCity: 63 },
  { name: 'Succeeded', surname: 'Bardcan', birthYear: 1987, birthCity: 63 },
  { name: 'Faile', surname: 'Baddxdxran', birthYear: 1987, birthCity: 63 },

  { name: 'Faile', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    
 
]
export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: null
    }
  }
render(){
  return (
    <MaterialTable
    title="minion table"
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
          onClick: (event, rowData) => console.log(  rowData.surname)
        }
      ]
      }
    />
  );

}
}