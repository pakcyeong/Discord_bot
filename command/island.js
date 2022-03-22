const { default: axios } = require("axios");


class islnd {

    constructor(){}

    /*
    * @url: 모험섬 조회 사이트
    */

    island = async () => {
        return new Promise(function(resolve, reject){
            resolve(axios.get('http://152.70.248.4:5000/adventureisland/',function(res){
                if(res){ }
                else{ reject('모험섬 조회 중 문제가 발생하였습니다. 잠시 후, 다시 입력해주세요') }
            }));
        }) 
    }
}

module.exports = { islnd };