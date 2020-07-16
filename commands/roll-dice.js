module.exports = {
    name: 'roll-dice',
    aliases: ['dice', 'roll'],
    description: 'Roll some dice in an expression of "Xdy[+/- z]"',
    args: true,
    usage: '<die expression> [operator then number or expression, can be repeated]',
    guildOnly: false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // ...
    },
};