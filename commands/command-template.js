module.exports = {
    name: '[command name]',
    aliases: ['aliases', 'go', 'here'],
    description: '[Information about the command.]',
    args: true || false,
    usage: '[provide the usage such as: <user> <role>',
    guildOnly: true || false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // ...
    },
};