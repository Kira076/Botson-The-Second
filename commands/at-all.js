module.exports = {
    name: 'at-all',
    description: '@\'s everyone individually',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        const guild = message.channel.guild;

        if (message.author.id === '178880546221326336' || message.author.id === '160217975285219328') {
            return guild.members.cache
                .each(member => message.channel.send(`${member.user}`));
        }
        else {
            message.channel.send('I\'m afraid I can\'t do that, Dave.');
        }
    },
};