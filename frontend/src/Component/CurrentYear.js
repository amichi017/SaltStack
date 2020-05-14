
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';
import { ThumbUpSharp } from "@material-ui/icons";

const styles = theme => ({
    root: {
      display: 'flex',
    },
});


class CurrentYear extends PureComponent {
    constructor(props) {
        super(props);
         this.dataInit = this.dataInit.bind(this);
        this.state = {
            start: new Date(),
            end:new Date(),
            data: this.dataInit(),
        };
      }
      dataInit(){
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
    
        // console.log(mnontStart,"gggggggggggggggggggggg");
        // console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){

     
        let funSaltReturns=store.getState().saltReturns.saltReturns
        .filter((item)=>{return item.full_ret.fun === "state.apply"})
        //To check I put the next 6 lines in the comment
        .filter((item)=>{
          let temp=new Date();
        let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
        let time=new Date(str);
        if(time.getFullYear() === temp.getFullYear()){return item;}
      })
      .forEach((item,index) => {
        let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
        let time=new Date(str);
        // console.log(time,"time")
        let place=time.getMonth();
          {item.full_ret.success === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}
        })

      }
        
    
      
       console.log(dataInit,"dataInit");
       
        // for (let i=1;i<=mnonthDay;i++){
        //     dataInit.push( { name: String(i), Fail: i+10*2/(i+1*2), Success: i+5/(i+1)*5 });
        // }
        // console.log(dataInit);
        return dataInit;
      
      }
   
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
    


export default withStyles(styles)(CurrentYear);







// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/mc8r7e6p/';

