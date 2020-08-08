const { Command } = require('discord.js-commando');
const _ = require('lodash');

module.exports = class PokeAltFacts extends Command {
    constructor(client) {
        super(client, {
            name: 'poke-alternative-facts',
            aliases: ['alt-fax', 'poke-alt-facts', 'poke-alt-fax'],
            group: 'pokemon',
            memberName: 'poke-alternative-facts',
            description: 'Randomly selects from the server\'s alternative facts. If none are set, use add-alt-fax',
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 10,
            },
            // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
        });
    }

    // eslint-disable-next-line no-unused-vars
    run(message, { text, option }) {
        const guild = message.guild.id;

        const factsObj = this.client.dbHandler.get(guild, 'poke-alt-facts');
        if(typeof factsObj !== 'undefined') {
            const chosenPokemon = _.sample(factsObj);
            const chosenFact = _.sample(chosenPokemon);

            return message.say(`${chosenPokemon}: ${chosenFact}`);
        }
        else {
            return message.say('Sorry boss, all outta facts');
        }
    }
};