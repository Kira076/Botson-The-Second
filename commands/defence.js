module.exports = {
    name: 'defence',
    description: 'Blanket defence',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // ...
        return message.channel.send('This is entrapment.');
    },
};