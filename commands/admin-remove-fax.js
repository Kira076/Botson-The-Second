module.exports = {
    name: 'remove-alt-fax',
    aliases: ['rm-alt-fax', 'remove-fax'],
    description: 'Remove an alternative pokemon fact',
    args: true,
    usage: '<The db _id field of the fact to be removed>',
    guildOnly: false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, utils) {
        // ...
        if (message.author.id === '178880546221326336') {
            const guild = message.guild.id;
            const id = args[0];
            const text = 'DELETE FROM $1_alt_pokefax WHERE _id = $2';
            const values = [guild, id];
            try {
                utils.pool.query(text, values);
                return message.channel.send('Fact removed.');
            }
            catch (err) {
                utils.loggers.genLogger.error(err);
                return message.channel.send('Failed to remove fact. :(');
            }
        }
    },
};