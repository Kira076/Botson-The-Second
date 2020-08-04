module.exports = {
    name: 'add-alt-fax',
    aliases: [],
    description: 'Add an alternative pokemon fact',
    args: true,
    usage: '<Capitalized pokemon name> <new fact>',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, libs) {
        // ...
        const pokeName = args[0];
        const fact = args.slice(1).join(' ');
        const guild = message.guild.id;

        if (pokeName.length > 32 || fact.length > 256) {
            return message.channel.send('I\'m sorry, Pokemon name must be 32 characters or less and the fact must be 256 characters or less.');
        }

        const query = 'INSERT INTO $1_alt_pokefax (Pokemon, Fact) VALUES ($2, $3)';
        const values = [guild, pokeName, fact];

        (async () => {
            const dbClient = await libs.pool.connect();
            try {
                libs.loggers.guildLogger.info(`Attempting to add alt fax for guild ${guild}`);
                const res = await dbClient.query(query, values);
                libs.loggers.guildLogger.info(`Added alt pokefax for ${guild}, response: ${res}`);
            }
            finally {
                dbClient.release();
            }
        })().catch(err => libs.loggers.genLogger.error(err));
    },
};