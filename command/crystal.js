const { default: axios } = require("axios");


class cr {

    constructor(){}

    /*
    * @url: 크리스탈 구매가, 판매가 조회 사이트
    */

    crystal = async () => {
        return new Promise(function(resolve, reject){
            resolve(axios.get('http://152.70.248.4:5000/crystal/'));
        })
        // axios.get('http://152.70.248.4:5000/crystal/')
        //     .then(function(res){
        //         return res.data;
        //     })      
    }

}

module.exports = { cr };