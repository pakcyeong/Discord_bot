const Discord = require('discord.js');
const { sc } = require('../command/search');
const { em } = require('./embed');
const fs = require('fs');
const { rejects } = require('assert');

const sch = new sc();
const emm = new em();


const cmd = {
    name: 'command',
    desc: 'command for discord-bot',
    command:[ '도움', '도전', '수집품', '크리스탈', '모험섬', '검색', '샵', '비매', '업뎃' ]
}

module.exports = {

    command: async (input) => {
        switch(input[0]){
            case cmd.command[0]: //도움 complete
                return emm.help();
                break;
            /*case cmd.command[1]: //도전
            *    break;
            *case cmd.command[2]: //수집품
            *    break;
            *case cmd.command[3]: //크리스탈
            *    break;
            *case cmd.command[4]: //모험섬
            *    break;      
            */   
            case cmd.command[5]: //검색 complete
                return sch.search(input[1])
                            .then(value => emm.fSearch(value))
                            .catch()
                            .then();
                break;
            /*case cmd.command[6]: //샵
            *    break;
            *case cmd.command[7]: //비매
            *    break;
            *case cmd.command[8]: //업뎃
            *    break;
            */
            default: //명령어가 아닌 경우
                return '잘못된 명령어입니다.';
                break;
        }
    }

}