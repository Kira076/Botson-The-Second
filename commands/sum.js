module.exports = {
    name: 'sum',
    description: 'Shut up, Markus',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return message.channel.send('Shut up, Markus...');
    },
};