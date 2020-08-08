const { Command } = require('discord.js-commando');

module.exports = class AddAltPokeFactCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'add-alt-fax',
            aliases: [],
            group: 'pokemon',
            memberName: 'add-poke-alt-fact',
            description: 'Add an alternative pokemon fact',
            args: [
                {
                    key: 'pokemon',
                    prompt: 'The pokemon to add a fact for',
                    type: 'string',
                },
                {
                    key: 'fact',
                    prompt: 'The fact to add',
                    type: 'string',
                },
            ],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 10,
            },
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
        });
    }

    run(message, { pokemon, fact }) {
        const guild = message.guild.id;

        const result = this.client.dbHandler.set(guild, 'poke-alt-facts', { pokemon, fact });

        if(!result) return message.say('Failed to add the fact!');
        else return message.say('Fact added!');
    }
};