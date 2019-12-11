const fs = require('fs');


const input=fs.readFileSync("input.json", "utf8");


const RDD = JSON.parse("[" + input + "]");
const x=RDD[0];
const RDDnwe = x.filter((item) => {if(item.fun ==='state.apply'){return item}})
console.log( RDDnwe)