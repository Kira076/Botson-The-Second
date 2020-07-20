const altFacts = require('../utils/alternative-poke-facts.json');
const _ = require('lodash');

module.exports = {
    name: 'poke-alternative-facts',
    aliases: ['alt-fax', 'the-don-phan'],
    description: 'Alternative facts about Nicole\'s "favourite" pokemon',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, libs) {
        // ...
        const keys = Object.keys(altFacts);
        const chosenKey = _.sample(keys);
        const chosenFact = altFacts[chosenKey];

        return message.channel.send(`${chosenKey}: ${chosenFact}`);

        // return message.channel.send(`${response.name.replace(response.name[0], response.name[0].toUpperCase())}: ${choice.flavor_text.replace(/\n/g, ' ')}`);
    },
};