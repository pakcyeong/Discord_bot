const { getData } = require("./webParse.js");
const Discord = require('discord.js');
const client = new Discord.Client();
const Token = 'Token-Data';
const loaUrl = 'https://lostark.game.onstove.com/Profile/Character/';
const prefix = ':';

const cmdList = [
    'find', 'crystal', 'adv', 'nonmanner', 'calender', 'calculator', 'help'
]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('log-in!'); //login check
})

client.on('message', (message) => {
    let args = message.content.substring(prefix.length).split(" ");

    if(message.content.startsWith(prefix)){
        const nickName = encodeURI(args[1]);
        const userData = getData(loaUrl + nickName);
        console.log(userData); // 03.04 undefined 출력 이후 정상 출력

    }else if(args[1]==""){
        console.log('Put command'); //command가 없을 경우
        return;
    }else{
        console.log('Not command'); //command가 아닌 경우
        return;
    }
})

client.login(Token);