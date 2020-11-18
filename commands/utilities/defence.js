const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'defence',
            aliases: [],
            group: 'utilities',
            memberName: 'defence',
            description: 'Defence against the Dark Ones.',
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }

    // eslint-disable-next-line no-unused-vars
    run(message, { text, option }) {
        return message.say('This is entrapment.');
    }
};