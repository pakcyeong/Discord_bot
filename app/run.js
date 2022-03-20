// const challenge = require('../command/challenge');
// const collect = require('../command/collect');
// const crystal = require('../command/crystal');
// const island = require('../command/island');
// const shop = require('../command/shop');
// const stuff = require('../command/stuff');
// const update = require('../command/update');
const search = require('../command/search');

module.exports = {
    command:[
        'search', 'crystal', 'collect', 'challenge', 'island', 'update', 'stuff', 'shop', 'collect'
    ],
    run: (args) => {
        search.run(args[1]);
    }
}
