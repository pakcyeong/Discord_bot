const Discord = require('discord.js');
const r = require('./app/run');
const prefix = ":";

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('log-in!'); //login check
})

client.on("message", function(message){
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ");
    r.run(args);
});

client.login('TOKEN IN HERE');