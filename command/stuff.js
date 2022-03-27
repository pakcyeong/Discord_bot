const axios = require('axios');

class stf {

    /*
    *   @url : lost ark inven community website
    *   @param : lost ark user nickname
    *   @return : .json
    */

    constructor(){}

    stuff = async (input) => {

        const url = "https://www.inven.co.kr/board/lostark/5355?query=list&p=1&sterm=&name=subject&keyword=";
        let usrId = encodeURI(input);
        let contents = [];

        return new Promise(function(resolve, reject){

            url += usrId;
            axios.get(url, function(res){

            })

            if(true){
                
            } else {
                reject('로스트 아크 인벤 사사게에 검색되지 않은 유저 입니다.');
            }
        })

    }

}

module.exports = { stf };