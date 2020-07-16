const { Parser } = require('../utils/dice-helpers');

module.exports = {
    name: 'roll-dice',
    aliases: ['dice', 'roll'],
    description: 'Roll some dice in an expression of "Xdy[+/- z]". The expression can contain multiple segments such as "4d6+7+2d6", but do not include spaces.',
    args: true,
    usage: '<die expression>',
    guildOnly: false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // ...
        const diceParser = new Parser(args[0]);
        console.log(diceParser.input);
    },
};