const { default: axios } = require("axios");


class stf {

    constructor(){}

    /*
    * @url: 로아 인벤 사사게 조회 사이트
    */

    stuff = async (input) => {
        let usrId = encodeURI(input);
        return new Promise(function(resolve, reject){
            resolve(axios.get('http://152.70.248.4:5000/sasa/' + usrId, function(res){
                if(res){ }
                else{ reject('인벤 사사게 조회 중 문제가 발생하였습니다. 잠시 후, 다시 입력해주세요') }
            }));
        }) 
    }
}

module.exports = { stf };