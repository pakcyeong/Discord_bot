const Discord = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

var usrInfo = {
    usrData:{},
    usrLv:{},
    usrStat:{
        myStat:[],
        myTend:[]
    },
    usrEngr:[]
};

module.exports = {

    write: async function(id){
        
        const usrId = encodeURI(id);
        const url = "https://lostark.game.onstove.com/Profile/Character/";

        axios.get(url + usrId).then((res, err) => {

            if(err) { console.log(err); return; };
        
            const $ = cheerio.load(res.data);
            const $usrData = $("div.content--profile").children("div.profile-character-info");
            const $usrLv = $("div.content--profile").children("div.profile-ingame");
            const $usrStat = $("#profile-ability div.profile-ability-basic ul").children("li");
            const $usrBttStat = $("#profile-ability div.profile-ability-battle ul").children("li");
            const $usrEngv = $("#profile-ability div.profile-ability-engrave div.swiper-container div.swiper-wrapper ul");
            const $usrTend = $('body script');

            $usrData.each(function(index, elem){
                usrInfo.usrData = {
                    name: $(this).find('span.profile-character-info__name').text(),
                    class: $(this).find('img.profile-character-info__img').attr('alt'),
                    classIco: $(this).find('img.profile-character-info__img').attr('src'),
                    server: $(this).find('span.profile-character-info__server').text().substring(1)
                }
            }); //이름, 직업, 서버 data

            $usrLv.each(function(index, elem){
                usrInfo.usrLv = {
                    expLv: $(this).find('div.level-info__expedition span').eq(1).text(),
                    bttLv: $(this).find('div.level-info__item span').eq(1).text(),
                    itmLv: $(this).find('div.level-info2__item span').eq(1).text(),
                    wisLv: $(this).find('div.game-info__wisdom span').eq(1).text()
                }
                usrInfo.usrData.title = $(this).find('div.game-info__title span').eq(1).text();
                usrInfo.usrData.guild = $(this).find('div.game-info__guild span').eq(1).text();
                usrInfo.usrData.pvp = $(this).find('div.level-info__pvp span').eq(1).text();
                usrInfo.usrData.wisdom = $(this).find('div.game-info__wisdom span').eq(2).text();
            }); //레벨 관련, 칭호, 길드, pvp, 영지 data

            $usrStat.eq(0).each(function(index, elem){
                usrInfo.usrStat.usrAttk = $(this).find('span').eq(1).text()
            });

            $usrStat.eq(1).each(function(index, elem){
                usrInfo.usrStat.usrHp = $(this).find('span').eq(1).text()
            }); //체력, 공격력 data

            for(var i=0;i<=5;i++){
                $usrBttStat.eq(i).each(function(index, elem){
                    usrInfo.usrStat.myStat[i] = $(this).find('span').eq(1).text()
                }); //특성 data
            }

            for(var indx = 0, i=0;i<=1;i++){
                for(var j=0;j<=3;j++){
                    $usrEngv.eq(i).children('li').eq(j).each(function(index,elem){
                        usrInfo.usrEngr[indx] = $(this).find('span').text();
                        indx += 1;
                    }); 
                }
            } //각인 data

            var tmpTnd = $usrTend.eq(10).html().match(/value: \[\d+(,)\n\s+\d+(,)\n\s+\d+(,)\n\s+\d+\]/);
            tmpTnd = tmpTnd[0].replace(/[^0-9\n]/g,'').split('\n');
            for(var i=0;i<4;i++){
                usrInfo.usrStat.myTend[i] = tmpTnd[i];
            } //성향 data

            const dataBuffer = new fs.readFileSync('./json/userInfo.json');
            var dataJSON = JSON.stringify(usrInfo);
            new fs.writeFileSync('./json/userInfo.json', dataJSON);

        });
    },

    read:() => {

        const result = fs.readFileSync('./json/userInfo.json', 'utf8');
        return result;
    },

    embed: async function(dataObj){
        const usr = JSON.parse(dataObj);
        const dataObjEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(dataObj.name)
        .setThumbnail(dataObj.icon)
        .addFields(
            { name: '기본 정보', value: `\`서버\`: ${dataObj.server}\n\`클래스\`: ${dataObj.class}\n\`칭호\`: ${dataObj.title}\n\`길드\`: ${dataObj.guild}\n\`영지\`: ${dataObj.wisdom}`, inline: true },
            { name: '레벨 정보', value: `\`전투 레벨\`: ${dataObj.bttLv}\n\`원정대 레벨\`: ${dataObj.expLv}\n\`아이템 레벨\`: ${dataObj.itmLv}\n\`영지 레벨\`: ${dataObj.wisLv} `, inline: true },
            { name: '기본 특성', value: `\`공격력\`: ${dataObj.attk}\n\`생명력\`: ${dataObj.hp}`, inline: true },
            { name: '전투 특성', value: `\`치명\`: ${dataObj.crit}\n\`특화\`: ${dataObj.spec}\n\`제압\`: ${dataObj.subd}\n\`신속\`: ${dataObj.agil}\n\`인내\`: ${dataObj.endu}\n\`숙련\`: ${dataObj.prof}`, inline: true }
        )
        dataObjEmbed.addField('성향', `\`지성\`: ${dataObj.inte}\n\`담력\`: ${dataObj.brav}\n\`매력\`: ${dataObj.char}\n\`친절\`: ${dataObj.kind}`, true)

        channel.send({ embeds: [dataObjEmbed] });
    },

    run: async function(id){
        try {
            const s = await this.write(id);
            const r = await this.read(s);
            this.embed(r);
        } catch (err) {
            console.log('error');
            return;
        }
    }

}
