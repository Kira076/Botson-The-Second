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
        const facts = libs.db.altFacts.find({}, function(err, docs) {
            if (err) {
                console.log(err);
            }
            else {
                return docs;
            }
        });
        console.log(facts);
        const chosenFact = _.sample(facts);

        return message.channel.send(`${chosenFact.pokemon}: ${chosenFact.fact}`);

        // return message.channel.send(`${response.name.replace(response.name[0], response.name[0].toUpperCase())}: ${choice.flavor_text.replace(/\n/g, ' ')}`);
    },
};