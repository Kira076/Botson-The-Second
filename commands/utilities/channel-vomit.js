const { Command } = require('discord.js-commando');

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'channel-vomit',
            aliases: [],
            group: 'utilities',
            memberName: 'channel-vomit',
            description: 'Spit out the list of channels/channel ids',
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
        const channels = message.channel.guild.channels.cache;
        console.log(channels);
        return message.say('I feel better already!');
    }
};