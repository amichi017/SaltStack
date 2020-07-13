
import { withStyles } from "@material-ui/core/styles";
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import store from '../store';
import { saltReturns } from '../actions/date';
import {connect} from 'react-redux';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


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
         store.dispatch(saltReturns("LastThreeMonths"));
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
            flag:true,
         
        };
      }
      componentWillReceiveProps(nextProps) {
        if( (((this.props.date.start.toLocaleDateString()!== nextProps.date.start.toLocaleDateString()) || (this.props.date.end.toLocaleDateString()!== nextProps.date.end.toLocaleDateString() ))) 
        && (this.state.flag===true)){

           this.setState({one: this.dataInitOne(),
            tow: this.dataInitTow(),
            three: this.dataInitThree()});
          
        }
      }
      shouldComponentUpdate(nextProps, nextState) {
        if(this.state.flag===true){
          this.setState({one: this.dataInitOne(),
            tow: this.dataInitTow(),
            three: this.dataInitThree(),flag:false});
          return true;
        }
       return false;
        
      }
      dataInitOne(){
        let dataInit=[];
        let listMonth=['January','February','March','April',
        'May','June','July','August','September',
        'October','November','December'];
          let temp=new Date();
         //let temp=new Date(2020,8);
        let tempMonth=temp.getMonth()-2;
        if(tempMonth<0){tempMonth+=12}
        console.log(tempMonth,"1");
        // let temp=new Date(2019,10);
      // console.log(tempMonth,"tempMonth")
        let monthDay =new Date(temp.getFullYear(), temp.getMonth()-4, 0).getDate();
      
        //this.state.nameThree=listMonth[monthDay-2];
      
           for (let i=1;i<=monthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
        
        // let mnontStart=new Date(temp.getFullYear(), temp.getMonth()-3);
    

        // let mnontEnd=new Date(temp.getFullYear(), temp.getMonth()-3, monthDay);
        // mnontEnd.setHours(23,59,59);

       // console.log(mnontStart,"gggggggggggggggggggggg");
       // console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){
        let funSaltReturns=store.getState().saltReturns.saltReturns
      //   .filter((item)=>{return item.full_ret.fun === "state.apply"})
        .filter((item)=>{
      //   let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
      //   let time=new Date(str);
      //  if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
      if(tempMonth===parseInt(item.jid.slice(4,6))){return item;}
      })
      .forEach((item,index) => {
        let place= (parseInt(item.jid.slice(6,8))-1);
        //  console.log(place,"day");
        let flag=0;
        let res=true;
       // if(item.full_ret.success === false){res=false}
        let temp =Object.entries(item.return);
        if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
        else{
          //console.log(item,'item');
         // let flag =0;
          let dataTemp=Object.entries(item.return).map((e,index,arr) => {
            if(e[1].result === false && flag===0){
             dataInit[place].Fail++;
             flag=1;
             //break;
            }
           else if(index===arr.length-1 && flag === 0){
             dataInit[place].Success++;
           }
          else {
            
          }
        
         });
 
      }




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
        let temp=new Date();
        //let temp=new Date(2020,8);
        let tempMonth=temp.getMonth()-1;
        if(tempMonth<0){tempMonth+=12}
        console.log(tempMonth,"2");
        // let temp=new Date(2019,10);
      // console.log(tempMonth,"tempMonth")
        let monthDay =new Date(temp.getFullYear(), temp.getMonth()-3, 0).getDate();
      
        //this.state.nameThree=listMonth[monthDay-2];
      
           for (let i=1;i<=monthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
        console.log(dataInit,"dataInit")
        // let mnontStart=new Date(temp.getFullYear(), temp.getMonth()-2);
    

        // let mnontEnd=new Date(temp.getFullYear(), temp.getMonth()-2, monthDay);
        // mnontEnd.setHours(23,59,59);

       // console.log(mnontStart,"gggggggggggggggggggggg");
        //console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){
        let funSaltReturns=store.getState().saltReturns.saltReturns
      //   .filter((item)=>{return item.full_ret.fun === "state.apply"})
      .filter((item)=>{
      //   let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
      //   let time=new Date(str);
      //   if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
      if(tempMonth===parseInt(item.jid.slice(4,6))){return item;}
      })
      .forEach((item,index) => {
        let place= (parseInt(item.jid.slice(6,8))-1);
         // console.log(place,"day");
         let flag=0;
         let res=true;
    
         if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
         else{
          //console.log(item,'item');
         // let flag =0;
          let dataTemp=Object.entries(item.return).map((e,index,arr) => {
            if(e[1].result === false && flag===0){
             dataInit[place].Fail++;
             flag=1;
             //break;
            }
           if(index===arr.length-1 && flag === 0){
             console.log("place",place)
             console.log("dataaa",dataInit)
             dataInit[place].Success++;
           }
      
        
         });
 
      }


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
        //let temp=new Date(2020,8);
        let tempMonth=temp.getMonth();
        if(tempMonth<0){tempMonth+=12}
     console.log(tempMonth,"3");
        // let temp=new Date(2019,10);
      // console.log(tempMonth,"tempMonth")
        // let temp=new Date(2019,10);
      
        let monthDay =new Date(temp.getFullYear(), temp.getMonth()-2, 0).getDate();
       
        // this.state.nameThree=this.state.month[monthDay-2];
        //console.log(this.state.month,"this.state.month");
           for (let i=1;i<=monthDay;i++){
            dataInit.push( { name: String(i), Fail:0, Success:0 });
        }
       
        // let mnontStart=new Date(temp.getFullYear(), temp.getMonth()-1);
    

        // let mnontEnd=new Date(temp.getFullYear(), temp.getMonth()-1, monthDay);
        // mnontEnd.setHours(23,59,59);

        // console.log(mnontStart,"gggggggggggggggggggggg");
        // console.log(mnontEnd,"gggggggggggggggggggggg");
        if(store.getState().saltReturns.saltReturns!==null){
        let funSaltReturns=store.getState().saltReturns.saltReturns
         //.filter((item)=>{return item.full_ret.fun === "state.apply"})
       .filter((item)=>{
      //   let str=item.jid.slice(0,4)+"-"+String(parseInt(item.jid.slice(4,6)))+"-"+item.jid.slice(6,8);
      //   let time=new Date(str);
      //   if(((time.getTime() >=mnontStart.getTime()))  && (time.getTime() <=mnontEnd.getTime())){return item;}
      if(tempMonth===parseInt(item.jid.slice(4,6))){return item;}
       })
      .forEach((item,index) => {
        let place= (parseInt(item.jid.slice(6,8))-1);
        //   console.log(place,"day");
        let res=true;
        let flag=0;
       // if(item.full_ret.success === false){res=false}
      
       if(Array.isArray(item.return)){ res=true;   {res === true ?(dataInit[place].Success++):(dataInit[place].Fail++)}}
       else{
        //console.log(item,'item');
       // let flag =0;
        let dataTemp=Object.entries(item.return).map((e,index,arr) => {
          if(e[1].result === false && flag===0){
           dataInit[place].Fail++;
           flag=1;
           //break;
          }
         if(index===arr.length-1 && flag === 0){
           dataInit[place].Success++;
         }
      
      
       });
      
       
     
    }
        





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
    


const mapStateToProps = (state, ownProps) => {
  return {
      saltReturns: state.saltReturns,
      date: state.date
  }
}

export default connect(mapStateToProps)(withStyles(styles)(LastThreeMonths));
