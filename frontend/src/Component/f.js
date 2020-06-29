const fs = require('fs');
let dataIsFinal;
fs.readFile('saltReturns.txt', 'utf8', function(err, data) {
    if (err) throw err;
    //const r =data.trim()
    const arr =data.split("/*");
    const v =data.split("/*");
    // .filter((item)=>{
    //    if(item!==''){return item;}
    // });
	//console.log(arr);
    for(let i=1;i<arr.length;i++){
        arr[i]=arr[i].substring(61);
       // arr[i]=arr[i].concat('{', arr[i]);
       arr[i]="{" + arr[i];
		
       // arr[i].padStart(1,"{")
       // console.log(arr);
        // if(arr[i]==='"_id"'){
        //     arr[i]="";
		// //console.log(arr[i]);
        //     arr[i+1]="";
        //     arr[i+2]="";
        // }	
	
        	
        
		// if(arr[i]==='/*'){
		// 	arr[i]="";
		// 	//console.log(arr[i]);
        //     arr[i+1]="";
        //     arr[i+2]="";
		// }
    }
    //console.log(arr[1])
	let dataIsFinal=arr.filter((item)=>{
       if(item!==''){return item;}
    });
	
    const y =dataIsFinal.join('');
	setTimeout(() => {
    fs.writeFile('salt.txt',  y, function (err) {
        if (err) throw err;
        console.log('Replaced!');
      });
}, 1000);
// 	//const x= data.replace("//*1*//"g,''); 

    
});
