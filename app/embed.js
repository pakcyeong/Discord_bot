const { MessageEmbed } = require('discord.js');
const url = "https://lostark.game.onstove.com/Profile/Character/";
class em extends MessageEmbed{

    constructor(){
        super()
    }

    help = async () => {

        const helpEmbed = '\`\`\` < 로아 봇 명령어 > \`\`\`\`\`\`🎮 명령 식별자 : !\`\`\`\`\`\`🎮 기본 제공 명령어 \n 도움, 검색 닉네임\`\`\`\`\`\`🎮 지원 예정 명령어 \n 크리스탈, 인벤 닉네임, 도전, 수집품 닉네임, 샵 물건, !업뎃\`\`\`'
            
        return helpEmbed;
    }

    fSearch = async (input) => {

        const searchEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(input.usrData.name)
            .setThumbnail(input.usrData.classIco)
            .setURL(url+input.usrData.name)
            .addFields(
                { 
                    name: '기본정보', value: 
                    '\`서버\` : ' + input.usrData.server + '\n' +
                    '\`클래스\` : ' + input.usrData.class + '\n' +
                    '\`길드\` : ' + input.usrData.guild + '\n' +
                    '\`영지\` : ' + input.usrData.wisdom + '\n' +
                    '\`칭호\` : ' + input.usrData.title
                    , inline: true 
                },
                { 
                    name: '레벨정보', value: 
                    '\`전투 레벨\` : ' + input.usrLv.bttLv + '\n' +
                    '\`원정대 레벨\` : ' + input.usrLv.expLv + '\n' +
                    '\`아이템 레벨\` : ' + input.usrLv.itmLv + '\n' +
                    '\`영지 레벨\` : ' + input.usrLv.wisLv
                    , inline: true 
                },
                { 
                    name: '기본특성', value: 
                    '\`공격력\` : ' + input.usrStat.usrAttk + '\n' +
                    '\`생명력\` : ' + input.usrStat.usrHp
                    , inline: true 
                },
                { 
                    name: '전투특성', value: 
                    '\`치명\` : ' + input.usrStat.stat[0] + '\n' +
                    '\`특화\` : ' + input.usrStat.stat[1] + '\n' +
                    '\`제압\` : ' + input.usrStat.stat[2] + '\n' +
                    '\`신속\` : ' + input.usrStat.stat[3] + '\n' +
                    '\`인내\` : ' + input.usrStat.stat[4] + '\n' +
                    '\`숙련\` : ' + input.usrStat.stat[5]
                    , inline: true 
                },
                { 
                    name: '성향', value: 
                    '\`지성\` : ' + input.usrStat.tend[0] + '\n' +
                    '\`담력\` : ' + input.usrStat.tend[1] + '\n' +
                    '\`매력\` : ' + input.usrStat.tend[2] + '\n' +
                    '\`친절\` : ' + input.usrStat.tend[3]
                    , inline: true 
                },
            )
            .setTimestamp()
            .setFooter('Made by 가렌조아');

            if(input.usrEngr != undefined){
                searchEmbed.addField( '각인효과', input.usrEngr.replace(/undefined/,''),true )
            };
            
        
        return searchEmbed;
    }



}

module.exports = { em };
