const fs = require('fs');


const input=fs.readFileSync("input.json", "utf8");


const RDD = JSON.parse("[" + input + "]");

const RddNwe = RDD[0]
.filter((item) => {if(item.fun ==='state.apply'){return item}})
.map((item)=>{
    return {name:item.minion,
            _id:item._id,
            id:item.full_ret.id,
            time:item.full_ret.jid,
            stutus:item.full_ret.success,
            return:item.return
           }
})
console.log(RddNwe)
module.exports=RddNwe;