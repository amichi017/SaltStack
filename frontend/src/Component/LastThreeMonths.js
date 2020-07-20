<<<<<<< HEAD
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';
import { saltReturns } from '../actions/date';
import {connect} from 'react-redux';
import axios from 'axios'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import {
  LAST_THREE_MONTHS_ONE,
     LAST_THREE_MONTHS_TOW,
     LAST_THREE_MONTHS_THREE
} from '../actions/types';
import { ThreeDRotationSharp } from "@material-ui/icons";

const styles = theme => ({
    root: {
        
        flexGrow: 1,
        maxWidth: 400,
      },
      button:{
        margin: theme.spacing(1),
      }
});
const getDataFromServer = (str,start,end) => {
  let timer_1=new Date().getTime();

  let dataInit=[];
  let temp=new Date();
  if(str===LAST_THREE_MONTHS_ONE){

      let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
      for (let i=1;i<=monthDayOne;i++){
          dataInit.push( { name: String(i), Fail:0, Success:0 });
          }
        
  }
  else if(str===LAST_THREE_MONTHS_TOW){

      let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
      for (let i=1;i<=monthDayTow;i++){
          dataInit.push( { name: String(i), Fail:0, Success:0 });
    }
  }
  else if(str===LAST_THREE_MONTHS_THREE){

          
      let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
      for (let i=1;i<=monthDayThree;i++){
          dataInit.push( { name: String(i), Fail:0, Success:0 });
  }
}
 
      let minions=[];
      let url='/api/saltReturns/apply/'+start+"/"+end;
    
     
      console.log("url" ,url);
      axios.get(url, tokenConfig())
      .then((res) => {
        minions=minions.concat(res.data);
       
        if(minions!==null){
          
          let funSaltReturns=minions
       
        .forEach((item) => {
            let place= (parseInt(item.jid.slice(6,8))-1);
           
           let res=true;
           let flag=0;
          
           if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
           else{
             
               let dataTemp=Object.entries(item.return).map((e,index,arr) => {
                if((e[1].result === false) && (flag===0)){
                  dataInit[place].Fail++;
                  flag=1;
               
                 }
                if(index===arr.length-1 && flag === 0){
                  dataInit[place].Success++;
                }
           
             
              });
      
           }
         
          })
       
          }
          if(str===LAST_THREE_MONTHS_ONE){
            this.state.one=dataInit;
          }
          else if(str===LAST_THREE_MONTHS_TOW){
            this.state.tow=dataInit;
          }
          else if(str===LAST_THREE_MONTHS_THREE){
            this.state.three=dataInit;
          }
          let timer_2=new Date().getTime();
          console.log(timer_2-timer_1,"time from str")
          
      })
      .catch(err => {
        this.setState({error:true});
        setTimeout(()=>{this.setState({error:false});}, 8000);
      
       });
  
  }
const tokenConfig = () => {
  // console.log("getstatteeeeeslatl",getState())
   // Get token from localstorage
   const token = store.getState().auth.token;

   // Headers
   const config = {
       headers: {
           "Content-type": "multipart/form-data"
       }
   }

   // If token, add to headers
   if(token) {
      config.headers["Authorization"] = ` Bearer ${token} `;
   }

return config;
}
class LastThreeMonths extends PureComponent {
    constructor(props) {
        super(props);
        this.initWithoutInformation = this.initWithoutInformation.bind(this);
         this.dataInitOne = this.dataInitOne.bind(this);
         this.dataInitTow = this.dataInitTow.bind(this);
         this.dataInitThree = this.dataInitThree.bind(this);
         this.getDataFromServer = this.getDataFromServer.bind(this);
         this.initFirstTime = this.initFirstTime.bind(this);
        // store.dispatch(saltReturns("LastThreeMonths"));
  
        this.state = {
            start: new Date(),
            end:new Date(),
            nameOne:'',
            nameTow:'',
            nameThree:'',
            one: [],
            tow: [],
            three: [],
            flag:true,
            erroe:false,
         
        };
        this.initFirstTime();
        this.initWithoutInformation();
      
      }
initFirstTime(){
                  
          let dataInitOne=[];



          let temp=new Date();
          // let temp=new Date(2019,10);

          let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
            for (let i=1;i<=monthDayOne;i++){
              dataInitOne.push( { name: String(i), Fail:0, Success:0 });
          }
          this.state.one=dataInitOne;
          ////////////////////////////////////////////////////////////////////////////////////


          let dataInitTow=[];

          let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
            for (let i=1;i<=monthDayTow;i++){
              dataInitTow.push( { name: String(i), Fail:0, Success:0 });
          }
          this.state.tow=dataInitTow;
          ///////////////////////////////////////////////////////////////////////////////////


          let dataInitThree=[];


          let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
            for (let i=1;i<=monthDayThree;i++){
              dataInitThree.push( { name: String(i), Fail:0, Success:0 });
          }
          this.state.three=dataInitThree;
}
initWithoutInformation(){
  if(store.getState().LastThreeMonths.dataInitOne.length>0){
    this.state.one= store.getState().LastThreeMonths.dataInitOne;
    console.log("this.state.three= store.getState().LastThreeMonths.dataInitOne;")
     this.forceUpdate();
    
   }
   else{ this.dataInitOne();  console.log(" this.dataInitOne();")}

   if(store.getState().LastThreeMonths.dataInitTow.length>0){
    this.state.tow= store.getState().LastThreeMonths.dataInitTow;
    console.log("this.state.three= store.getState().LastThreeMonths.dataInitTow;")
     this.forceUpdate();
    
   }
   else{  this.dataInitTow();  console.log(" this.dataInitTow();")}

   if(store.getState().LastThreeMonths.dataInitThree.length>0){
    this.state.three= store.getState().LastThreeMonths.dataInitThree;
     this.forceUpdate();
     console.log("this.state.three= store.getState().LastThreeMonths.dataInitThree;")
    
   }
   else{ this.dataInitThree(); console.log(" this.dataInitThree();")}
  
  

      // let dataInitOne=[];

      // let temp=new Date();
      // // let temp=new Date(2019,10);

      // let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
      //   for (let i=1;i<=monthDayOne;i++){
      //     dataInitOne.push( { name: String(i), Fail:0, Success:0 });
      // }
      // this.state.one=dataInitOne;
      // ////////////////////////////////////////////////////////////////////////////////////


      // let dataInitTow=[];

      // let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
      //   for (let i=1;i<=monthDayTow;i++){
      //     dataInitTow.push( { name: String(i), Fail:0, Success:0 });
      // }
      // this.state.tow=dataInitTow;
      // ///////////////////////////////////////////////////////////////////////////////////


      // let dataInitThree=[];


      // let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
      //   for (let i=1;i<=monthDayThree;i++){
      //     dataInitThree.push( { name: String(i), Fail:0, Success:0 });
      // }
      // this.state.three=dataInitThree;
}
getDataFromServer (str,start,end) {
        let timer_1=new Date().getTime();
      
        let dataInit=[];
        let temp=new Date();
        if(str===LAST_THREE_MONTHS_ONE){
      
            let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
            for (let i=1;i<=monthDayOne;i++){
                dataInit.push( { name: String(i), Fail:0, Success:0 });
                }
              
        }
        else if(str===LAST_THREE_MONTHS_TOW){
      
            let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
            for (let i=1;i<=monthDayTow;i++){
                dataInit.push( { name: String(i), Fail:0, Success:0 });
          }
        }
        else if(str===LAST_THREE_MONTHS_THREE){
      
                
            let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
            for (let i=1;i<=monthDayThree;i++){
                dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
      }
       
            let minions=[];
            let url='/api/saltReturns/apply/'+start+"/"+end;
          
           
            console.log("url" ,url);
            axios.get(url, tokenConfig())
            .then((res) => {
              minions=minions.concat(res.data);
             
              if(minions!==null){
                
                let funSaltReturns=minions
             
              .forEach((item) => {
                  let place= (parseInt(item.jid.slice(6,8))-1);
                 
                 let res=true;
                 let flag=0;
                
                 if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
                 else{
                   
                     let dataTemp=Object.entries(item.return).map((e,index,arr) => {
                      if((e[1].result === false) && (flag===0)){
                        dataInit[place].Fail++;
                        flag=1;
                     
                       }
                      if(index===arr.length-1 && flag === 0){
                        dataInit[place].Success++;
                      }
                 
                   
                    });
            
                 }
               
                })
             
                }
                if(str===LAST_THREE_MONTHS_ONE){
                  store.dispatch({
                    type:LAST_THREE_MONTHS_ONE,
                    payload:dataInit
                  })
                  this.state.one=dataInit;
                }
                else if(str===LAST_THREE_MONTHS_TOW){
                  store.dispatch({
                    type:LAST_THREE_MONTHS_TOW,
                    payload:dataInit
                  })
                  this.state.tow=dataInit;
                }
                else if(str===LAST_THREE_MONTHS_THREE){
                  store.dispatch({
                    type:LAST_THREE_MONTHS_THREE,
                    payload:dataInit
                  })
                  this.state.three=dataInit;
                }
                let timer_2=new Date().getTime();
                console.log(timer_2-timer_1,"time from str")
                this.forceUpdate();
            })
            .catch(err => {
              console.log(err,"error in data");
            
             });
        
}
dataInitOne(){
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEnd=String(new Date(year, new Date().getMonth()-2, 0).getDate());
    
        dayEnd=parseInt(dayEnd)<10?"0"+dayEnd:dayEnd;
    
        let satrtMonth=new Date(year, new Date().getMonth()-2, 1).getMonth();
    
        satrtMonth=parseInt(satrtMonth)<10?"0"+satrtMonth:satrtMonth;
    
        let start= year+satrtMonth+"01"+"000000000000";
        let end= year+satrtMonth+dayEnd+"235959595959";
      
        this.getDataFromServer(LAST_THREE_MONTHS_ONE,start,end)
}

    //     })

dataInitTow(){
         
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEndTow=String(new Date(year, new Date().getMonth()-1, 0).getDate());

        dayEndTow=parseInt(dayEndTow)<10?"0"+dayEndTow:dayEndTow;
    
        let satrtMonthTow=new Date(year, new Date().getMonth()-1, 1).getMonth();
    
        satrtMonthTow=parseInt(satrtMonthTow)<10?"0"+satrtMonthTow:satrtMonthTow;
    
        let startTow= year+satrtMonthTow+"01"+"000000000000";
        let endTow= year+satrtMonthTow+dayEndTow+"235959595959";
        this.getDataFromServer(LAST_THREE_MONTHS_TOW,startTow,endTow)
}

dataInitThree(){
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEndThree=String(new Date(year, new Date().getMonth(), 0).getDate());

        dayEndThree=parseInt(dayEndThree)<10?"0"+dayEndThree:dayEndThree;
    
        let satrtMonthTrhee=new Date(year, new Date().getMonth(), 1).getMonth();
    
        satrtMonthTrhee=parseInt(satrtMonthTrhee)<10?"0"+satrtMonthTrhee:satrtMonthTrhee;
    
        let startTrhee= year+satrtMonthTrhee+"01"+"000000000000";
        let endTrhee= year+satrtMonthTrhee+dayEndThree+"235959595959";
    
        this.getDataFromServer(LAST_THREE_MONTHS_THREE,startTrhee,endTrhee)
}

    
   
    render() {
        let listMonth=['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
        let temp=new Date();
        let tempMonth=temp.getMonth();
        if((tempMonth-1)<0){tempMonth+=12;}
        this.state.nameThree=listMonth[tempMonth-1];
        if((tempMonth-2)<0){tempMonth+=12;}
        this.state.nameTow=listMonth[tempMonth-2];
        if((tempMonth-3)<0){tempMonth+=12;}
        this.state.nameOne=listMonth[tempMonth-3];
    
        return (
          <div>
            <div className={this.props.classes.msg}>
                <Snackbar open={this.state.error} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    The system did not load the information for the past three months <strong>because Internal Server Error  </strong>
                    </Alert>
                    </Snackbar>
               </div>
          <Button
          variant="contained"
          color="primary"
     
          onClick={()=>{  
            this.dataInitOne();
            this.dataInitTow();
            this.dataInitThree();}}
          className={this.props.classes.button}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
            <TreeView
            className={this.props.classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId="1" label={this.state.nameOne} >
                    <BarChart
                    width={1170}
                    height={500}
                    data={this.state.one}
                    margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="Fail" fill="#ff6666"/>
                    <Bar dataKey="Success" fill="#82ca9d" />
                </BarChart>
                </TreeItem>

                <TreeItem nodeId="2" label={this.state.nameTow}>
                    <BarChart
                    width={1170}
                    height={500}
                    data={this.state.tow}
                    margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="Fail" fill="#ff6666"/>
                    <Bar dataKey="Success" fill="#82ca9d" />
                    </BarChart>
                </TreeItem>


                <TreeItem nodeId="3" label={this.state.nameThree}>
                    <BarChart
                    width={1170}
                    height={500}
                    data={this.state.three}
                    margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="Fail" fill="#ff6666"/>
                    <Bar dataKey="Success" fill="#82ca9d" />
                    </BarChart>
                </TreeItem>

            
            
          </TreeView>
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
=======
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';
import { saltReturns } from '../actions/date';
import {connect} from 'react-redux';
import axios from 'axios'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import RefreshIcon from '@material-ui/icons/Refresh';
import {
  LAST_THREE_MONTHS_ONE,
     LAST_THREE_MONTHS_TOW,
     LAST_THREE_MONTHS_THREE
} from '../actions/types';
import { ThreeDRotationSharp } from "@material-ui/icons";

const styles = theme => ({
    root: {
        
        flexGrow: 1,
        maxWidth: 400,
      },
      button:{
        margin: theme.spacing(1),
      }
});
const getDataFromServer = (str,start,end) => {
  let timer_1=new Date().getTime();

  let dataInit=[];
  let temp=new Date();
  if(str===LAST_THREE_MONTHS_ONE){

      let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
      for (let i=1;i<=monthDayOne;i++){
          dataInit.push( { name: String(i), Fail:0, Success:0 });
          }
        
  }
  else if(str===LAST_THREE_MONTHS_TOW){

      let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
      for (let i=1;i<=monthDayTow;i++){
          dataInit.push( { name: String(i), Fail:0, Success:0 });
    }
  }
  else if(str===LAST_THREE_MONTHS_THREE){

          
      let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
      for (let i=1;i<=monthDayThree;i++){
          dataInit.push( { name: String(i), Fail:0, Success:0 });
  }
}
 
      let minions=[];
      let url='/api/saltReturns/apply/'+start+"/"+end;
    
     
      console.log("url" ,url);
      axios.get(url, tokenConfig())
      .then((res) => {
        minions=minions.concat(res.data);
       
        if(minions!==null){
          
          let funSaltReturns=minions
       
        .forEach((item) => {
            let place= (parseInt(item.jid.slice(6,8))-1);
           
           let res=true;
           let flag=0;
          
           if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
           else{
             
               let dataTemp=Object.entries(item.return).map((e,index,arr) => {
                if((e[1].result === false) && (flag===0)){
                  dataInit[place].Fail++;
                  flag=1;
               
                 }
                if(index===arr.length-1 && flag === 0){
                  dataInit[place].Success++;
                }
           
             
              });
      
           }
         
          })
       
          }
          if(str===LAST_THREE_MONTHS_ONE){
            this.state.one=dataInit;
          }
          else if(str===LAST_THREE_MONTHS_TOW){
            this.state.tow=dataInit;
          }
          else if(str===LAST_THREE_MONTHS_THREE){
            this.state.three=dataInit;
          }
          let timer_2=new Date().getTime();
          console.log(timer_2-timer_1,"time from str")
          
      })
      .catch(err => {
        console.log(err,"error in data");
      
       });
  
  }
const tokenConfig = () => {
  // console.log("getstatteeeeeslatl",getState())
   // Get token from localstorage
   const token = store.getState().auth.token;

   // Headers
   const config = {
       headers: {
           "Content-type": "multipart/form-data"
       }
   }

   // If token, add to headers
   if(token) {
      config.headers["Authorization"] = ` Bearer ${token} `;
   }

return config;
}
class LastThreeMonths extends PureComponent {
    constructor(props) {
        super(props);
        this.initWithoutInformation = this.initWithoutInformation.bind(this);
         this.dataInitOne = this.dataInitOne.bind(this);
         this.dataInitTow = this.dataInitTow.bind(this);
         this.dataInitThree = this.dataInitThree.bind(this);
         this.getDataFromServer = this.getDataFromServer.bind(this);
         this.initFirstTime = this.initFirstTime.bind(this);
        // store.dispatch(saltReturns("LastThreeMonths"));
  
        this.state = {
            start: new Date(),
            end:new Date(),
            nameOne:'',
            nameTow:'',
            nameThree:'',
            one: [],
            tow: [],
            three: [],
            flag:true,
         
        };
        this.initWithoutInformation();
      
      }
      initFirstTime(){
        
let dataInitOne=[];



let temp=new Date();
// let temp=new Date(2019,10);

let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
  for (let i=1;i<=monthDayOne;i++){
    dataInitOne.push( { name: String(i), Fail:0, Success:0 });
}
this.state.one=dataInitOne;
////////////////////////////////////////////////////////////////////////////////////


let dataInitTow=[];

let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
  for (let i=1;i<=monthDayTow;i++){
    dataInitTow.push( { name: String(i), Fail:0, Success:0 });
}
this.state.tow=dataInitTow;
///////////////////////////////////////////////////////////////////////////////////


let dataInitThree=[];


let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
  for (let i=1;i<=monthDayThree;i++){
    dataInitThree.push( { name: String(i), Fail:0, Success:0 });
}
this.state.three=dataInitThree;
      }
initWithoutInformation(){
  if(store.getState().LastThreeMonths.dataInitOne.length>0){
    this.state.one= store.getState().LastThreeMonths.dataInitOne;
    console.log("this.state.three= store.getState().LastThreeMonths.dataInitOne;")
     this.forceUpdate();
    
   }
   else{ this.dataInitOne();  console.log(" this.dataInitOne();")}

   if(store.getState().LastThreeMonths.dataInitTow.length>0){
    this.state.tow= store.getState().LastThreeMonths.dataInitTow;
    console.log("this.state.three= store.getState().LastThreeMonths.dataInitTow;")
     this.forceUpdate();
    
   }
   else{  this.dataInitTow();  console.log(" this.dataInitTow();")}

   if(store.getState().LastThreeMonths.dataInitThree.length>0){
    this.state.three= store.getState().LastThreeMonths.dataInitThree;
     this.forceUpdate();
     console.log("this.state.three= store.getState().LastThreeMonths.dataInitThree;")
    
   }
   else{ this.dataInitThree(); console.log(" this.dataInitThree();")}
  
  

      // let dataInitOne=[];

      // let temp=new Date();
      // // let temp=new Date(2019,10);

      // let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
      //   for (let i=1;i<=monthDayOne;i++){
      //     dataInitOne.push( { name: String(i), Fail:0, Success:0 });
      // }
      // this.state.one=dataInitOne;
      // ////////////////////////////////////////////////////////////////////////////////////


      // let dataInitTow=[];

      // let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
      //   for (let i=1;i<=monthDayTow;i++){
      //     dataInitTow.push( { name: String(i), Fail:0, Success:0 });
      // }
      // this.state.tow=dataInitTow;
      // ///////////////////////////////////////////////////////////////////////////////////


      // let dataInitThree=[];


      // let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
      //   for (let i=1;i<=monthDayThree;i++){
      //     dataInitThree.push( { name: String(i), Fail:0, Success:0 });
      // }
      // this.state.three=dataInitThree;
}
getDataFromServer (str,start,end) {
        let timer_1=new Date().getTime();
      
        let dataInit=[];
        let temp=new Date();
        if(str===LAST_THREE_MONTHS_ONE){
      
            let monthDayOne =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
            for (let i=1;i<=monthDayOne;i++){
                dataInit.push( { name: String(i), Fail:0, Success:0 });
                }
              
        }
        else if(str===LAST_THREE_MONTHS_TOW){
      
            let monthDayTow =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
            for (let i=1;i<=monthDayTow;i++){
                dataInit.push( { name: String(i), Fail:0, Success:0 });
          }
        }
        else if(str===LAST_THREE_MONTHS_THREE){
      
                
            let monthDayThree =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
            for (let i=1;i<=monthDayThree;i++){
                dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
      }
       
            let minions=[];
            let url='/api/saltReturns/apply/'+start+"/"+end;
          
           
            console.log("url" ,url);
            axios.get(url, tokenConfig())
            .then((res) => {
              minions=minions.concat(res.data);
             
              if(minions!==null){
                
                let funSaltReturns=minions
             
              .forEach((item) => {
                  let place= (parseInt(item.jid.slice(6,8))-1);
                 
                 let res=true;
                 let flag=0;
                
                 if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
                 else{
                   
                     let dataTemp=Object.entries(item.return).map((e,index,arr) => {
                      if((e[1].result === false) && (flag===0)){
                        dataInit[place].Fail++;
                        flag=1;
                     
                       }
                      if(index===arr.length-1 && flag === 0){
                        dataInit[place].Success++;
                      }
                 
                   
                    });
            
                 }
               
                })
             
                }
                if(str===LAST_THREE_MONTHS_ONE){
                  store.dispatch({
                    type:LAST_THREE_MONTHS_ONE,
                    payload:dataInit
                  })
                  this.state.one=dataInit;
                }
                else if(str===LAST_THREE_MONTHS_TOW){
                  store.dispatch({
                    type:LAST_THREE_MONTHS_TOW,
                    payload:dataInit
                  })
                  this.state.tow=dataInit;
                }
                else if(str===LAST_THREE_MONTHS_THREE){
                  store.dispatch({
                    type:LAST_THREE_MONTHS_THREE,
                    payload:dataInit
                  })
                  this.state.three=dataInit;
                }
                let timer_2=new Date().getTime();
                console.log(timer_2-timer_1,"time from str")
                this.forceUpdate();
            })
            .catch(err => {
              console.log(err,"error in data");
            
             });
        
}
dataInitOne(){
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEnd=String(new Date(year, new Date().getMonth()-2, 0).getDate());
    
        dayEnd=parseInt(dayEnd)<10?"0"+dayEnd:dayEnd;
    
        let satrtMonth=new Date(year, new Date().getMonth()-2, 1).getMonth();
    
        satrtMonth=parseInt(satrtMonth)<10?"0"+satrtMonth:satrtMonth;
    
        let start= year+satrtMonth+"01"+"000000000000";
        let end= year+satrtMonth+dayEnd+"235959595959";
      
        this.getDataFromServer(LAST_THREE_MONTHS_ONE,start,end)
}

    //     })

dataInitTow(){
         
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEndTow=String(new Date(year, new Date().getMonth()-1, 0).getDate());

        dayEndTow=parseInt(dayEndTow)<10?"0"+dayEndTow:dayEndTow;
    
        let satrtMonthTow=new Date(year, new Date().getMonth()-1, 1).getMonth();
    
        satrtMonthTow=parseInt(satrtMonthTow)<10?"0"+satrtMonthTow:satrtMonthTow;
    
        let startTow= year+satrtMonthTow+"01"+"000000000000";
        let endTow= year+satrtMonthTow+dayEndTow+"235959595959";
        this.getDataFromServer(LAST_THREE_MONTHS_TOW,startTow,endTow)
}

      dataInitThree(){
        let yearTemp=String(new Date().getFullYear());
        let year =String(new Date(yearTemp, new Date().getMonth()-2, 1).getFullYear());
        let dayEndThree=String(new Date(year, new Date().getMonth(), 0).getDate());

        dayEndThree=parseInt(dayEndThree)<10?"0"+dayEndThree:dayEndThree;
    
        let satrtMonthTrhee=new Date(year, new Date().getMonth(), 1).getMonth();
    
        satrtMonthTrhee=parseInt(satrtMonthTrhee)<10?"0"+satrtMonthTrhee:satrtMonthTrhee;
    
        let startTrhee= year+satrtMonthTrhee+"01"+"000000000000";
        let endTrhee= year+satrtMonthTrhee+dayEndThree+"235959595959";
    
        this.getDataFromServer(LAST_THREE_MONTHS_THREE,startTrhee,endTrhee)
      }

    
   
    render() {
        let listMonth=['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
        let temp=new Date();
        let tempMonth=temp.getMonth();
        if((tempMonth-1)<0){tempMonth+=12;}
        this.state.nameThree=listMonth[tempMonth-1];
        if((tempMonth-2)<0){tempMonth+=12;}
        this.state.nameTow=listMonth[tempMonth-2];
        if((tempMonth-3)<0){tempMonth+=12;}
        this.state.nameOne=listMonth[tempMonth-3];
    
        return (
          <div>
          <Button
          variant="contained"
          color="primary"
     
          onClick={()=>{  
            this.dataInitOne();
            this.dataInitTow();
            this.dataInitThree();}}
          className={this.props.classes.button}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
            <TreeView
            className={this.props.classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId="1" label={this.state.nameOne} >
                    <BarChart
                    width={1170}
                    height={500}
                    data={this.state.one}
                    margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="Fail" fill="#ff6666"/>
                    <Bar dataKey="Success" fill="#82ca9d" />
                </BarChart>
                </TreeItem>

                <TreeItem nodeId="2" label={this.state.nameTow}>
                    <BarChart
                    width={1170}
                    height={500}
                    data={this.state.tow}
                    margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="Fail" fill="#ff6666"/>
                    <Bar dataKey="Success" fill="#82ca9d" />
                    </BarChart>
                </TreeItem>


                <TreeItem nodeId="3" label={this.state.nameThree}>
                    <BarChart
                    width={1170}
                    height={500}
                    data={this.state.three}
                    margin={{
                    top: 5, right: 20, left: 10, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="Fail" fill="#ff6666"/>
                    <Bar dataKey="Success" fill="#82ca9d" />
                    </BarChart>
                </TreeItem>

            
            
          </TreeView>
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
>>>>>>> 00ce104ffbc429e346bb4ddc2db5d08d084aed1f
export default connect(mapStateToProps)(withStyles(styles)(LastThreeMonths));