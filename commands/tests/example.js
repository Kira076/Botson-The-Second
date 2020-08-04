const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'example',
            aliases: [],
            group: 'tests',
            memberName: 'example',
            description: 'Used as a template for commands on the back end.',
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string',
                    default: 'meow',
                    validate: text => text.length < 201,
                },
                {
                    key: 'option',
                    prompt: 'Yes or No?',
                    type: 'string',
                    oneOf: ['yes', 'no'],
                },
            ],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 10,
            },
            // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: true,
        });
    }

    // eslint-disable-next-line no-unused-vars
    run(message, { text, option }) {
        return message.say('This doesn\'t do anything. How did you get here?');
    }
};