module.exports = {
    name: 'remove-alt-fax',
    aliases: ['rm-alt-fax', 'remove-fax'],
    description: 'Remove an alternative pokemon fact',
    args: true,
    usage: '<The db _id field of the fact to be removed>',
    guildOnly: false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, libs) {
        // ...

        if (message.author.id === '178880546221326336') {
            libs.db.altFacts.remove({ _id: args[0] }, {}, function(err) {
                if (err) {
                    console.log(err);
                    return message.channel.send('Failed to remove fact. :(');
                }
                else {
                    return message.channel.send('Fact removed successfully.');
                }
            });
        }
    },
};