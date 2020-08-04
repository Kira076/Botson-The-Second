const Pokedex = require('pokedex-promise-v2');
const _ = require('lodash');
const options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000,
    timeout: 5 * 1000,
};
const P = new Pokedex(options);

module.exports = {
    name: 'poke-fax',
    aliases: ['poke-facts', 'poke-trivia'],
    description: 'Gives you a random pokemon fact! (currently just gives a random pokemon pokedex entry',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, utils) {
        const ind = getRndInteger(1, 809);
        (async () => {
            try {
                const response = await P.getPokemonSpeciesByName(ind);
                const enEntries = response.flavor_text_entries.filter(entry => entry.language.name === 'en');
                const choice = _.sample(enEntries);
                return message.channel.send(`${response.name.replace(response.name[0], response.name[0].toUpperCase())}: ${choice.flavor_text.replace(/\n/g, ' ')}`);
            }
            catch (err) {
                utils.loggers.genLogger.error(`Failed to retrieve from PokeAPI: ${err}`);
                return message.channel.send('Could not retrieve a pokedex entry');
            }
        });
    },
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}