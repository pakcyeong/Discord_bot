const fs = require('fs');

class rw{

    constructor(){}

    reward = (input) => {

        var objData = {};
        const data = input.split(" ");
        
        const readJson = new fs.readFile('./json/reward.json','utf-8',(err,res) => {
            if(err){ return ; }

            objData = JSON.parse(res);
            
            if(Object.keys(objData).find(key => key == data[0])===undefined){
                console.log("err");
            }else{
                objValue = objData[data[0]];
                this.dataSend(objValue,data[1]);
            }

            objData = JSON.parse(res);
            

        });

    }

    dataSend = (param1, param2) => {
        if(param2 == '노말'){
            console.log(param1.노말);
        }else if(param2 == '하드'){
            console.log(param1.하드);
        }else{
            console.log(param1);
        }
    }
}

module.exports = { rw };