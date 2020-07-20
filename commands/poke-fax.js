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
    execute(message, args, libs) {
        const ind = getRndInteger(1, 809);

        /* P.getPokemonSpeciesByName(ind)
            .then(function(response) {
                const enEntries = response.flavor_text_entries.filter(entry => entry.language.id === 9);
                console.log(enEntries);
                const choice = _.sample(enEntries);
                return message.channel.send(choice.flavor_text);
            })
            .catch(function(error) {
                console.log(error);
            });*/
        P.getPokemonSpeciesByName(ind, function(response, error) {
            if(!error) {
                const enEntries = response.flavor_text_entries.filter(entry => entry.language.name === 'en');
                const choice = _.sample(enEntries);
                return message.channel.send(`${response.name.replace(response.name[0], response.name[0].toUpperCase())}: ${choice.flavor_text.replace(/\n/g, ' ')}`);
            }
            else {
                console.log(error);
            }
        });
    },
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}