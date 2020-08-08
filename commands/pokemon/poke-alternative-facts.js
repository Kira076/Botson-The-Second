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
        const handler = this.client.dbHandler;
        let factsList;

        (async () => {
            try {
                factsList = await handler.get(guild, 'poke-alt-facts');
                console.log(`Seeing factsObj as: ${JSON.stringify(factsList)}`);
                if(typeof factsObj !== 'undefined') {
                    const chosenFact = _.sample(factsList);

                    return message.say(`${chosenFact.pokemon}: ${chosenFact.fact}`);
                }
                else {
                    return message.say('Sorry boss, all outta facts');
                }
            }
            catch (err) {
                this.client.utils.loggers.genLogger.error(`Unable to get the facts for this server: ${err}`);
            }
        })();
    }
};