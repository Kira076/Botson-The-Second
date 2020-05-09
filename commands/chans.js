module.exports = {
    name: 'chans',
    description: '<DEV USE> Outputs channel information to the console',
    args: false,
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // ...
        return message.channel.guild.channels.cache
            .each(channel => console.log(channel.name, channel.id));
    },
};