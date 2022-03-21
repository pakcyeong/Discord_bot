const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { resolve } = require('path');

class sc {

    constructor(){}

    /*
    *   @param: User's name to search 
    */

    search = async (id) => {

        let usrId = encodeURI(id);
        let url = "https://lostark.game.onstove.com/Profile/Character/";

        return new Promise(function(resolve, reject){

            var usrinfo = {
                usrData:{},
                usrLv:{},
                usrStat:{
                    stat:[],
                    tend:[]
                },
                usrEngr:{}
            }

            axios.get( url + usrId ).then((res, err) => {

                const $ = cheerio.load(res.data);
                const $usrData = $('div.content--profile').children('div.profile-character-info');
                const $usrLv = $("div.content--profile").children("div.profile-ingame");
                const $usrStat = $("#profile-ability div.profile-ability-basic ul").children("li");
                const $usrBttStat = $("#profile-ability div.profile-ability-battle ul").children("li");
                const $usrEngv = $("#profile-ability div.profile-ability-engrave div.swiper-container div.swiper-wrapper ul");
                const $usrTend = $('body script');
                const $error = $('main div.content--profile div.profile-ingame div.profile-attention').children('span');

                if($error.eq(2).text() === '돌아가기'){ reject('없는 이름이거나 잘못된 이름입니다.') }
                else{ }

                //console.log($error.eq(2).text());
                

                $usrData.each(function(){

                    usrinfo.usrData = {
                        name: $(this).find('span.profile-character-info__name').text(),
                        class: $(this).find('img.profile-character-info__img').attr('alt'),
                        classIco: $(this).find('img.profile-character-info__img').attr('src'),
                        server: $(this).find('span.profile-character-info__server').text().substring(1)
                    }

                });

                $usrLv.each(function(index, elem){
                    usrinfo.usrLv = {
                        expLv: $(this).find('div.level-info__expedition span').eq(1).text(),
                        bttLv: $(this).find('div.level-info__item span').eq(1).text(),
                        itmLv: $(this).find('div.level-info2__item span').eq(1).text(),
                        wisLv: $(this).find('div.game-info__wisdom span').eq(1).text()
                    }
                    usrinfo.usrData.title = $(this).find('div.game-info__title span').eq(1).text();
                    usrinfo.usrData.guild = $(this).find('div.game-info__guild span').eq(1).text();
                    usrinfo.usrData.pvp = $(this).find('div.level-info__pvp span').eq(1).text();
                    usrinfo.usrData.wisdom = $(this).find('div.game-info__wisdom span').eq(2).text();
                }); //레벨 관련, 칭호, 길드, pvp, 영지 data

                if($usrStat.eq(0).find('span').eq(1).text() == ''){ reject('없는 이름이거나 잘못된 이름입니다.') }
                
                $usrStat.eq(0).each(function(index, elem){
                    usrinfo.usrStat.usrAttk = $(this).find('span').eq(1).text()
                });

                $usrStat.eq(1).each(function(index, elem){
                    usrinfo.usrStat.usrHp = $(this).find('span').eq(1).text()
                }); //체력, 공격력 data
                
                if($usrBttStat.eq(0).find('span').eq(1).text() == ''){ reject('없는 이름이거나 잘못된 이름입니다.') }

                for(var i=0;i<=5;i++){
                    $usrBttStat.eq(i).each(function(index, elem){
                        usrinfo.usrStat.stat[i] = $(this).find('span').eq(1).text()
                    }); //특성 data
                }
    
                for(var indx = 0, i=0;i<=1;i++){
                    for(var j=0;j<=3;j++){
                        $usrEngv.eq(i).children('li').eq(j).each(function(index,elem){
                            usrinfo.usrEngr += $(this).find('span').text() + '\n';
                            //indx += 1;
                        });
                    }
                } //각인 data

                var tmpTnd = $usrTend.eq(10).html().match(/value: \[\d+(,)\n\s+\d+(,)\n\s+\d+(,)\n\s+\d+\]/);

                if(tmpTnd == null){ 

                    reject('없는 이름이거나 잘못된 이름입니다.') 

                } else { 

                    tmpTnd = tmpTnd[0].replace(/[^0-9\n]/g,'').split('\n'); 

                    for(var i=0;i<4;i++){
                        usrinfo.usrStat.tend[i] = tmpTnd[i];
                    } //성향 data

                }
                    
                //if(false) { 
                 //   reject()
                //}

                //else { 
                    resolve(usrinfo) 
                //}
    
            })
        })
    }
}

module.exports = { sc }