module.exports = {
    name: 'peek',
    aliases: ['examine'],
    description: '<DEV USE> Outputs information about the tagged user to the console',
    args: true,
    usage: '<@mention>',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        return console.log(message.mentions.users.first());
    },
};