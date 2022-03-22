const { default: axios } = require("axios");


class cr {

    constructor(){}

    /*
    * @url: 크리스탈 구매가, 판매가 조회 사이트
    */

    crystal = async () => {
        return new Promise(function(resolve, reject){
            resolve(axios.get('http://152.70.248.4:5000/crystal/',function(res){
                if(res){ }
                else{ reject('크리스탈 시세 조회 중 문제가 발생하였습니다. 잠시 후, 다시 입력해주세요') }
            }));
        }) 
    }
}

module.exports = { cr };