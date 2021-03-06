const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { resolve } = require('path');

class sc {

    constructor(){}

    /*
    *   @param: lostark usr nickname for a searching
    *   @url: lostark main website
    *   This app's speed too slow ;-; Someday,I'll make better
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
                }
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

                // to find error #1 
                if($error.eq(2).text() === '돌아가기'){ reject('없는 이름이거나 잘못된 이름입니다.') }
                else{ }

                $usrData.each(function(){

                    // search the usrinfo - name, class, server
                    usrinfo.usrData = {
                        name: $(this).find('span.profile-character-info__name').text(),
                        class: $(this).find('img.profile-character-info__img').attr('alt'),
                        classIco: $(this).find('img.profile-character-info__img').attr('src'),
                        server: $(this).find('span.profile-character-info__server').text().substring(1)
                    }

                });

                $usrLv.each(function(index, elem){

                    // search data about the lv - expedition, battle, item, wisdom, pvp also add usrinfo - title, guild,  wisdom
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
                });

                // to find error #2
                if($usrStat.eq(0).find('span').eq(1).text() == ''){ reject('없는 이름이거나 잘못된 이름입니다.') }
                
                $usrStat.eq(0).each(function(index, elem){
                    usrinfo.usrStat.usrAttk = $(this).find('span').eq(1).text()
                }); // amount attack

                $usrStat.eq(1).each(function(index, elem){
                    usrinfo.usrStat.usrHp = $(this).find('span').eq(1).text()
                }); // health point
                
                // to find error #3
                if($usrBttStat.eq(0).find('span').eq(1).text() == ''){ reject('없는 이름이거나 잘못된 이름입니다.') }

                for(var i=0;i<=5;i++){
                    $usrBttStat.eq(i).each(function(index, elem){
                        usrinfo.usrStat.stat[i] = $(this).find('span').eq(1).text()
                    }); 
                }
                
                // add engrave to array type with '\n'
                for(var indx = 0, i=0;i<=1;i++){
                    if($usrEngv.eq(0).children('li').eq(0).find('span').text() == ''){ break; }
                    for(var j=0;j<=3;j++){
                        $usrEngv.eq(i).children('li').eq(j).each(function(index,elem){
                            usrinfo.usrEngr += $(this).find('span').text() + '\n';
                        });
                    }
                }


                var tmpTnd = $usrTend.eq(10).html().match(/value: \[\d+(,)\n\s+\d+(,)\n\s+\d+(,)\n\s+\d+\]/);

                if(tmpTnd == null){ 

                    reject('없는 이름이거나 잘못된 이름입니다.') 

                } else { 

                    tmpTnd = tmpTnd[0].replace(/[^0-9\n]/g,'').split('\n'); 

                    for(var i=0;i<4;i++){
                        usrinfo.usrStat.tend[i] = tmpTnd[i];
                    } //성향 data

                }
                    resolve(usrinfo) 
    
            })
        })
    }
}

module.exports = { sc };