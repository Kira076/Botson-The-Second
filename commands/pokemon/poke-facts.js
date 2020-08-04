const { Command } = require('discord.js-commando');
const Pokedex = require('pokedex-promise-v2');
const _ = require('lodash');
const options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000,
    timeout: 5 * 1000,
};
const P = new Pokedex(options);

module.exports = class PokeFactsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poke-facts',
            aliases: ['poke-fax', 'pokemon-facts'],
            group: 'pokemon',
            memberName: 'poke-facts',
            description: 'Retrieves a random pokemon fact/pokedex entry',
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }

    // eslint-disable-next-line no-unused-vars
    run(message) {
        const ind = this.getRndInteger(1, 809);
        (async () => {
            try {
                const response = await P.getPokemonSpeciesByName(ind);
                console.log(response);
                const enEntries = response.flavor_text_entries.filter(entry => entry.language.name === 'en');
                const choice = _.sample(enEntries);
                console.log(choice);
                return message.say(`${response.name.replace(response.name[0], response.name[0].toUpperCase())}: ${choice.flavor_text.replace(/\n/g, ' ')}`);
            }
            catch (err) {
                this.client.utils.loggers.genLogger.error(`Failed to retrieve from PokeAPI: ${err}`);
                return message.say('Could not retrieve a pokedex entry');
            }
        });
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
};