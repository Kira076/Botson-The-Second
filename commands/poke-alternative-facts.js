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
    execute(message, args, utils) {
        // ...
        const guild = message.guild.id;
        const text = 'SELECT * FROM $1_alt_pokefax';
        const values = [guild];
        let rows;

        try {
            rows = utils.pool.query(text, values);
            utils.devLogger.debug(`Rows returned from alt-fax get: ${rows}`);
        }
        catch (err) {
            utils.loggers.genLogger.error(err);
            return message.channel.send('Failed to find a fact. :(');
        }
        const chosenFact = _.sample(rows);

        return message.channel.send(`${chosenFact.Pokemon}: ${chosenFact.Fact}`);

        // return message.channel.send(`${response.name.replace(response.name[0], response.name[0].toUpperCase())}: ${choice.flavor_text.replace(/\n/g, ' ')}`);
    },
};