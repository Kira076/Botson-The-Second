const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'way-too-specific',
            aliases: [],
            group: 'utilities',
            memberName: 'way-too-specific',
            description: 'For what purpose has god forsaken us so?',
            args: [
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
    run(message) {
        const channel = message.channel.guild.channels.cache.get('626890547532922900');
        const messages = channel.messages.cache.array();
        console.log(messages);
        return message.say('Face now the true meaning of insanity.');
    }
};