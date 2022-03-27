// const challenge = require('../command/challenge');
// const collect = require('../command/collect');
// const crystal = require('../command/crystal');
// const island = require('../command/island');
// const shop = require('../command/shop');
// const stuff = require('../command/stuff');
// const update = require('../command/update');
// const search = require('../command/search');
const { Client } = require('discord.js');
const c = require('./cmd');
const prefix = '!';

class DiscordBotLoa extends Client {

    /*
    *   DiscordBotLoa
    *   main
    */

    constructor(props){
        super(props)
    }

    turnOn(){

        this.on('ready', () => {
            console.log(`Logged in as ${this.user.tag}!`);
            console.log('log-in!'); //login check
        })

        this.on('message', function(message){

            if(message.author.bot||!message.content.startsWith(prefix)) return;
            
            let args = message.content.substring(prefix.length).split(" ");

            c.command(args)
                .then((value) => {
                    message.channel.send(value)
                })
                .catch((reason) => {
                    message.channel.send(reason)
                });

        });

        this.on('message', function(message){
            if(message.content == "임시"){
                const exampleEmbed = {
                    title: 'Some title',
                    image: {
                        url: 'https://loawa.com/assets/images/chal/chal_01.jpg',
                        url: 'https://loawa.com/assets/images/chal/chal_02.jpg',
                        url: 'https://loawa.com/assets/images/chal/chal_03.jpg'
                    },
                };
                
                message.channel.send({ embeds: [exampleEmbed] });
            }else{
                return;
            }
        });

        this.login(process.env.TOKEN);
    }

}

module.exports = { DiscordBotLoa };