const axios = require('axios');
const cheerio = require('cheerio');

class stf {

    /*
    *   @url : lost ark inven community website
    *   @param : lost ark user nickname
    *   @return : .json
    */

    constructor(){}

    stuff = async (input) => {

        const url = "https://www.inven.co.kr/board/lostark/5355?query=list&p=1&sterm=&name=subject&keyword=";
        let usrId = input;
        let contents = [];

        return new Promise(function(resolve, reject){
        
            url += encodeURI(usrId);
            axios.get(url, function(res){
                const $ = cheerio.load(res.data);
                const $usrClean = $('div.no-result');
                const $usrSasage = $('div.board-list table tbody tr').eq(1).children('td.tit div.text-wrap div a');

                // $usrClean.each(function(){
                    
                // });

            })

            if(true){
                
            } else {
                reject('로스트 아크 인벤 사사게에 검색되지 않은 유저 입니다.');
            }
        })

    }

}

module.exports = { stf };