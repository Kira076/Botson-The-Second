module.exports = {
    name: 'add-alt-fax',
    aliases: [],
    description: 'Add an alternative pokemon fact',
    args: true,
    usage: '<Capitalized pokemon name> <new fact>',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, utils) {
        // ...
        const pokeName = args[0];
        const fact = args.slice(1).join(' ');
        const guild = message.guild.id;

        if (pokeName.length > 32 || fact.length > 256) {
            return message.channel.send('I\'m sorry, Pokemon name must be 32 characters or less and the fact must be 256 characters or less.');
        }

        const text = 'INSERT INTO $1_alt_pokefax (Pokemon, Fact) VALUES ($2, $3)';
        const values = [guild, pokeName, fact];

        try {
            utils.pool.query(text, values);
            return message.channel.send('Fact added.');
        }
        catch (err) {
            utils.loggers.genLogger.error(err);
            return message.channel.send('Failed to add fact. :(');
        }
    },
};