
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';
import axios from 'axios'
import { saltReturns } from '../actions/date';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import RefreshIcon from '@material-ui/icons/Refresh';
import {CURRENT_MONTH} from '../actions/types'
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
const styles = theme => ({
    root: {
      display: 'flex',
    },
    button:{
      margin: theme.spacing(1),
    }
});

export const tokenConfig = getState => {
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
class CurrentMonth extends PureComponent {
    constructor(props) {
        super(props);
         this.dataInit = this.dataInit.bind(this);
         this.initWithoutInformation = this.initWithoutInformation.bind(this);
         //store.dispatch(saltReturns("CurrentMonth"));
         //console.log(store.getState(),"store.getState()")
         this.initFirstTime = this.initFirstTime.bind(this);
        this.state = {
            start: new Date(),
            end:new Date(),
            data:[],
            flag:true,
            error:false,
        };
        this.initFirstTime();
        this.initWithoutInformation();
      }
      initFirstTime(){
        let dataInit=[];
        let temp=new Date();
        let mnonthDay =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
           for (let i=1;i<=mnonthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
        this.state.data= dataInit;
      }
      // componentWillUpdate(){
      //   this.setState({data:this.dataInit(),flag:false});
      initWithoutInformation(){
        if(store.getState().CurrentMonth.CurrentMonth.length>0){
         this.state.data= store.getState().CurrentMonth.CurrentMonth;
          this.forceUpdate();
          
        }
        else{
          this.dataInit();
        }
       
     
      }
      dataInit(){
        let time_1=new Date().getTime();
        let year=String(new Date().getFullYear());
        let dayEnd=String(new Date(year, new Date().getMonth()+1, 0).getDate());
        dayEnd=parseInt(dayEnd)<10?"0"+dayEnd:dayEnd;
        let satrtCurrentMonth=(new Date().getMonth()+1);
        satrtCurrentMonth=parseInt( satrtCurrentMonth)<10?"0"+ satrtCurrentMonth: satrtCurrentMonth;
        let Start= year+satrtCurrentMonth+"01"+"000000000000";
        let End= year+satrtCurrentMonth+dayEnd+"235959595959";
     
        let minions=[];
        let dataInit=[];
       
        let temp=new Date();
         let mnonthDay =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
            for (let i=1;i<=mnonthDay;i++){
             dataInit.push( { name: String(i), Fail:0, Success:0 });
         }

      let url='/api/saltReturns/apply/'+Start+"/"+End;
    
      axios.get(url, tokenConfig(store.getState()))
      .then((res) => {
        
        minions=minions.concat(res.data);
     
        if(minions!==null){
         
          const BreakException = {};
          
         
           
            let funSaltReturns=minions
       
            .forEach((item) => {
                let place= (parseInt(item.jid.slice(6,8))-1);
               
               let res=true;
               let flag=0;
              
               if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}



               else{
                try {
                   let dataTemp=Object.entries(item.return).forEach((e,index,arr) => {
                    if((e[1].result === false) && (flag===0)){
                      dataInit[place].Fail++;
                      flag=1;
                      throw BreakException;
                   
                     }
                    if(index===arr.length-1 && flag === 0){
                      dataInit[place].Success++;
                    }
               
                 
                  });


                } catch (e) {
                  if (e !== BreakException) throw e;
                }

          
               }
               
              })


         
     
          let time_2=new Date().getTime();
          console.log((time_2-time_1),"Time from month");
          }
          
          store.dispatch({
            type:CURRENT_MONTH,
            payload:dataInit
          })
          this.state.data= dataInit;
          this.forceUpdate();
    })
    .catch(err => {
      this.setState({error:true});
      setTimeout(()=>{this.setState({error:false});}, 8000);

       });

      }
      
    render() {
     // console.log("this.state 2",this.state)
        return (
          <div>
             <div className={this.props.classes.msg}>
                <Snackbar open={this.state.error} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    The system did not load the information for the current month  <strong>because Internal Server Error  </strong>
                    </Alert>
                    </Snackbar>
               </div>
          <Button
          variant="contained"
          color="primary"
       
          onClick={()=>{this.dataInit()}}
          className={this.props.classes.button}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
          <BarChart
            width={1220}
            height={500}
            data={this.state.data}
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
    export default connect(mapStateToProps)(withStyles(styles)(CurrentMonth));








// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/mc8r7e6p/';

