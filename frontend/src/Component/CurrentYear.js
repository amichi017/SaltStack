
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';

import { saltReturns } from '../actions/date';
import {connect} from 'react-redux';
const styles = theme => ({
    root: {
      display: 'flex',
    },
});


class CurrentYear extends PureComponent {
    constructor(props) {
        super(props);
         //this.dataInit = this.dataInit.bind(this);
        // store.dispatch(saltReturns("CurrentYear"));
        this.state = {
            start: new Date(),
            end:new Date(),
            data:  store.getState().CurrentYear.CurrentYear,
            flag:true,
        };
      }
    
      // componentWillReceiveProps(nextProps) {
      //   if( (((this.props.date.start.toLocaleDateString()!== nextProps.date.start.toLocaleDateString()) || (this.props.date.end.toLocaleDateString()!== nextProps.date.end.toLocaleDateString() ))) 
      //   && (this.state.flag===true)){

      //      this.setState({data:this.dataInit()});
          
      //   }
      // }
      // shouldComponentUpdate(nextProps, nextState) {
      //   if(this.state.flag===true){
      //     this.setState({data:this.dataInit(),flag:false});
      //     return true;
      //   }
      //  return false;
        
      // }
     
      // componentWillUpdate() {
      //   this.setState({data:this.dataInit()});
    //   // }
    //   dataInit(){
    //     let time_1=new Date().getTime();
    //     let dataInit=[];
    //     // let temp=new Date(2019,10);
    
    //     dataInit.push( { name: String('January'), Fail:0, Success:0 });
    //     dataInit.push( { name: String('February'), Fail:0, Success:0 });
    //     dataInit.push( { name: String('March'), Fail:0, Success:0 });
    //     dataInit.push( { name: String('April'), Fail:0, Success:0 });
    //     dataInit.push( { name: String('May '), Fail:0, Success:0 });
    //     dataInit.push( { name: String('June  '), Fail:0, Success:0 });
    //     dataInit.push( { name: String('July  '), Fail:0, Success:0 });
    //     dataInit.push( { name: String('August '), Fail:0, Success:0 });
    //     dataInit.push( { name: String('September '),Fail:0, Success:0 });
    //     dataInit.push( { name: String('October '), Fail:0, Success:0 });
    //     dataInit.push( { name: String('November  '),Fail:0, Success:0 });
    //     dataInit.push( { name: String('December '), Fail:0, Success:0 });
        
    //     if(store.getState().saltReturns.saltReturns!==null){

        
    //     let funSaltReturns=store.getState().saltReturns.saltReturns

    //   .forEach((item) => {
    //     let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
    //     let time=new Date(str);
    //     let place=time.getMonth();
    //     let res=true;
    //     let flag=0;
     
    //     if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
    //     else{
          
    //         let dataTemp=Object.entries(item.return).map((e,index,arr) => {
    //           if(e[1].result === false && flag===0){
    //            dataInit[place].Fail++;
    //            flag=1;
    //            //break;
    //           }
    //          if(index===arr.length-1 && flag === 0){
    //            dataInit[place].Success++;
    //          }
           
          
    //        });
          
           
        
    //     }

    //   })
        
    
    //     let time_2=new Date().getTime();
    //     console.log((time_2-time_1),"Time from year");
    //     return dataInit;
    // }
    //   }
   
    render() {
        return (
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

