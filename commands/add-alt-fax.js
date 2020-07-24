module.exports = {
    name: 'add-alt-fax',
    aliases: [],
    description: 'Add an alternative pokemon fact',
    args: true,
    usage: '<Capitalized pokemon name> <new fact>',
    guildOnly: false,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, libs) {
        // ...
        const pokeName = args[0];
        const fact = args.slice(1).join(' ');

        const doc = { pokemon: pokeName, fact: fact };

        libs.db.altFacts.insert(doc, function(err, newDoc) {
            if (err) {
                console.log(err);
                return message.channel.send('Failed to add fact. :(');
            }
            else {
                console.log(newDoc);
                return message.channel.send('Fact added successfully!');
            }
        });
    },
};