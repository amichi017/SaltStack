
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
import {CURRENT_YEAR} from '../actions/types'
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
const tokenConfig = getState => {
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

class CurrentYear extends PureComponent {
    constructor(props) {
        super(props);
         this.dataInit = this.dataInit.bind(this);
         this.initWithoutInformation = this.initWithoutInformation.bind(this);
         this.initFirstTime = this.initFirstTime.bind(this);
         //store.dispatch(saltReturns("CurrentYear"));
        this.state = {
            start: new Date(),
            end:new Date(),
            data:[],
            flag:true,
            error:false,
        };
        this.initFirstTime();
        this.initWithoutInformation()
      }
    initFirstTime(){
      let dataInit=[];
      // let temp=new Date(2019,10);
     
      dataInit.push( { name: String('January'), Fail:0, Success:0 });
      dataInit.push( { name: String('February'), Fail:0, Success:0 });
      dataInit.push( { name: String('March'), Fail:0, Success:0 });
      dataInit.push( { name: String('April'), Fail:0, Success:0 });
      dataInit.push( { name: String('May '), Fail:0, Success:0 });
      dataInit.push( { name: String('June  '), Fail:0, Success:0 });
      dataInit.push( { name: String('July  '), Fail:0, Success:0 });
      dataInit.push( { name: String('August '), Fail:0, Success:0 });
      dataInit.push( { name: String('September '),Fail:0, Success:0 });
      dataInit.push( { name: String('October '), Fail:0, Success:0 });
      dataInit.push( { name: String('November  '),Fail:0, Success:0 });
      dataInit.push( { name: String('December '), Fail:0, Success:0 });
      this.state.data= dataInit;
    }
      initWithoutInformation(){
        if(store.getState().CurrentYear.CurrentYear.length>0){
         this.state.data= store.getState().CurrentYear.CurrentYear;
          this.forceUpdate();
         
        }
        else{
          this.dataInit();
         
        }

      }
      dataInit(){
        this.initFirstTime();
        let time_1=new Date().getTime();
        let dataInit=[];
        // let temp=new Date(2019,10);
        const BreakException = {};
        dataInit.push( { name: String('January'), Fail:0, Success:0 });
        dataInit.push( { name: String('February'), Fail:0, Success:0 });
        dataInit.push( { name: String('March'), Fail:0, Success:0 });
        dataInit.push( { name: String('April'), Fail:0, Success:0 });
        dataInit.push( { name: String('May '), Fail:0, Success:0 });
        dataInit.push( { name: String('June  '), Fail:0, Success:0 });
        dataInit.push( { name: String('July  '), Fail:0, Success:0 });
        dataInit.push( { name: String('August '), Fail:0, Success:0 });
        dataInit.push( { name: String('September '),Fail:0, Success:0 });
        dataInit.push( { name: String('October '), Fail:0, Success:0 });
        dataInit.push( { name: String('November  '),Fail:0, Success:0 });
        dataInit.push( { name: String('December '), Fail:0, Success:0 });
        let year=String(new Date().getFullYear());
        let dayEnd=String(new Date(year, 12, 0).getDate());
        dayEnd=parseInt(dayEnd)<10?"0"+dayEnd:dayEnd;
        let Start= year+"0101"+"000000000000";
        let End= year+"12"+dayEnd+"235959595959";
        let minions=[];
      

        let url='/api/saltReturns/apply/'+Start+"/"+End;
      
        axios.get(url, tokenConfig(store.getState()))
        .then((res) => {

          minions=minions.concat(res.data);
     
          if(minions!==null){
           
            const BreakException = {};
                minions.forEach((item) => {
                let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
                let time=new Date(str);
                let place=time.getMonth();
                let res=true;
                let flag=0;
                //if(item.full_ret.success === false){res=false}
                //let temp =Object.entries(item.return);
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

          }
          this.state.data= dataInit;
          store.dispatch({
            type:CURRENT_YEAR,
            payload:dataInit
          })
          this.forceUpdate();
        
        }).catch(err => {
          this.setState({error:true});
          setTimeout(()=>{this.setState({error:false});}, 8000);

       });
      
        let time_2=new Date().getTime();
        console.log((time_2-time_1),"Time from year");
     
    }
      
   
    render() {
        return (
          <div>
              <div className={this.props.classes.msg}>
                <Snackbar open={this.state.error} autoHideDuration={8000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    The system did not load the information for the current year <strong>because Internal Server Error  </strong>
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
                margin={{top: 5, right: 20, left: 10, bottom: 5,}}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
              
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

  
  
  
export default connect(mapStateToProps)(withStyles(styles)(CurrentYear));









// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/mc8r7e6p/';

