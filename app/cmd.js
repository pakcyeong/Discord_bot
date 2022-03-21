const Discord = require('discord.js');
const Search = require('../command/search');
const { em } = require('./embed');
const fs = require('fs');
const searchMsg = new em();


const cmd = {
    name: 'command',
    desc: 'command for discord-bot',
    command:[ '도움', '도전', '수집품', '크리스탈', '모험섬', '검색', '샵', '비매', '업뎃' ]
}

module.exports = {

    command: (input) => {
        switch(input[0]){
            case cmd.command[0]: //도움
                break;
            case cmd.command[1]: //도전
                break;
            case cmd.command[2]: //수집품
                break;
            case cmd.command[3]: //크리스탈
                break;
            case cmd.command[4]: //모험섬
                break;
            case cmd.command[5]: //검색
                const f = Search.write(input[1]).then(()=>{
                    const result = fs.readFileSync('./json/userInfo.json', 'utf8');
                    console.log(result);
                    const newMsg = new em();
                    const send = newMsg.fSearch(result);
                    return send;
                })
                //console.log(f);
                return f;
                break;
            case cmd.command[6]: //샵
                break;
            case cmd.command[7]: //비매
                break;
            case cmd.command[8]: //업뎃
                break;
            default: //명령어가 아닌 경우
                break;
        }
    }

}