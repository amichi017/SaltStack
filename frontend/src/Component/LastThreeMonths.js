
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';

import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { ThumbUpSharp } from "@material-ui/icons";

const styles = theme => ({
    root: {
        
        flexGrow: 1,
        maxWidth: 400,
      },
});


class LastThreeMonths extends PureComponent {
    constructor(props) {
        super(props);
         this.dataInitOne = this.dataInitOne.bind(this);
         this.dataInitTow = this.dataInitTow.bind(this);
         this.dataInitThree = this.dataInitThree.bind(this);
         
        //  this.listMonth = this.listMonth.bind(this);
        this.state = {
            start: new Date(),
            end:new Date(),
            nameOne:'',
            nameTow:'',
            nameThree:'',
            one: this.dataInitOne(),
            tow: this.dataInitTow(),
            three: this.dataInitThree(),
         
        };
      }
    
      dataInitOne(){
        let dataInit=[];
        let listMonth=['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
         // let temp=new Date();
         let temp=new Date();
        let tempMonth=temp.getMonth()-2;
        if(tempMonth<0){tempMonth+=12}
     
        // let temp=new Date(2019,10);
      // console.log(tempMonth,"tempMonth")
        let monthDay =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
      
        //this.state.nameThree=listMonth[monthDay-2];
      
           for (let i=1;i<=monthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
       
        let mnontStart=new Date(temp.getFullYear(), temp.getMonth()-3);
    

        let mnontEnd=new Date(temp.getFullYear(), temp.getMonth()-3, monthDay);
        mnontEnd.setHours(23,59,59);

       // console.log(mnontStart,"gggggggggggggggggggggg");
       // console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){
        let funSaltReturns=store.getState().saltReturns.saltReturns
        .filter((item)=>{return item.full_ret.fun === "state.apply"})
        .filter((item)=>{
        let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
        let time=new Date(str);
        if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
      })
      .forEach((item,index) => {
          let place= (parseInt(item.jid.slice(6,8)));
        //  console.log(place,"day");
          {item.full_ret.success === true ?(dataInit[place-1].Success++):(dataInit[place-1].Fail++)}
        })

        }
        
        
    
      
    //    console.log(dataInit,"dataInit");
       
        // for (let i=1;i<=mnonthDay;i++){
        //     dataInit.push( { name: String(i), Fail: i+10*2/(i+1*2), Success: i+5/(i+1)*5 });
        // }
        // console.log(dataInit);
        return dataInit;
      
      }


      dataInitTow(){
        let dataInit=[];
        let listMonth=['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
        // let temp=new Date();
        let temp=new Date();
        let tempMonth=temp.getMonth()-1;
        if(tempMonth<0){tempMonth+=12}
     
        // let temp=new Date(2019,10);
      // console.log(tempMonth,"tempMonth")
        let monthDay =new Date(temp.getFullYear(), temp.getMonth()-1, 0).getDate();
      
        //this.state.nameThree=listMonth[monthDay-2];
      
           for (let i=1;i<=monthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
       
        let mnontStart=new Date(temp.getFullYear(), temp.getMonth()-2);
    

        let mnontEnd=new Date(temp.getFullYear(), temp.getMonth()-2, monthDay);
        mnontEnd.setHours(23,59,59);

       // console.log(mnontStart,"gggggggggggggggggggggg");
        //console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){
        let funSaltReturns=store.getState().saltReturns.saltReturns
        .filter((item)=>{return item.full_ret.fun === "state.apply"})
        .filter((item)=>{
        let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
        let time=new Date(str);
        if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
      })
      .forEach((item,index) => {
          let place= (parseInt(item.jid.slice(6,8)));
         // console.log(place,"day");
          {item.full_ret.success === true ?(dataInit[place-1].Success++):(dataInit[place-1].Fail++)}
        })

        }
        
        
    
      
    //    console.log(dataInit,"dataInit");
       
        // for (let i=1;i<=mnonthDay;i++){
        //     dataInit.push( { name: String(i), Fail: i+10*2/(i+1*2), Success: i+5/(i+1)*5 });
        // }
        // console.log(dataInit);
        return dataInit;
      
      }





      dataInitThree(){
        let dataInit=[];
        let listMonth=['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
        let temp=new Date();
        //let temp=new Date(2020,1);
        let tempMonth=temp.getMonth();
        if(tempMonth<0){tempMonth+=12}
     
        // let temp=new Date(2019,10);
      // console.log(tempMonth,"tempMonth")
        // let temp=new Date(2019,10);
      
        let monthDay =new Date(temp.getFullYear(), temp.getMonth(), 0).getDate();
       
        // this.state.nameThree=this.state.month[monthDay-2];
        //console.log(this.state.month,"this.state.month");
           for (let i=1;i<=monthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
       
        let mnontStart=new Date(temp.getFullYear(), temp.getMonth()-1);
    

        let mnontEnd=new Date(temp.getFullYear(), temp.getMonth()-1, monthDay);
        mnontEnd.setHours(23,59,59);

        // console.log(mnontStart,"gggggggggggggggggggggg");
        // console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){
        let funSaltReturns=store.getState().saltReturns.saltReturns
        .filter((item)=>{return item.full_ret.fun === "state.apply"})
        .filter((item)=>{
        let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6))-1)+"-"+item.jid.slice(6,8);
        let time=new Date(str);
        if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
      })
      .forEach((item,index) => {
     
          let place= (parseInt(item.jid.slice(6,8)));
        //   console.log(place,"day");
          {item.full_ret.success === true ?(dataInit[place-1].Success++):(dataInit[place-1].Fail++)}
        })

        }
        
        
    
      
      // console.log(dataInit,"dataInit 3");
       
        // for (let i=1;i<=mnonthDay;i++){
        //     dataInit.push( { name: String(i), Fail: i+10*2/(i+1*2), Success: i+5/(i+1)*5 });
        // }
        // console.log(dataInit);
        return dataInit;
      
      }


      componentDidMount(){
       
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

          
       
        );
      }
    }
    


export default withStyles(styles)(LastThreeMonths);







// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/mc8r7e6p/';

