const fs = require('fs');

const transformationFiles = fs.readdirSync('./transformations').filter(file => file.endsWith('.json'));

module.exports = {
    name: 'magical-girl',
    description: 'Initiates a magical girl transformation',
    args: true,
    usage: '<transformation index>',
    guildOnly: true,
    cooldown: 1,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // ...
        let transformation;

        for (const file of transformationFiles) {
            if (file === `${args[0]}.json`) {
                transformation = require(`../transformations/${file}`);
            }
        }

        function transform(trans) {
            const channelList = [];
            for (const channel in trans) {
                message.channel.guild.channels.cache.get(channel)
                    .setName(trans[channel]);
                channelList.push(trans[channel]);
            }
            const menuStr = `\`\`\`markdown\n# Channel Directory\n## Normal Beans\n1. ${channelList[1].slice(2)} - General Chat\n2. ${channelList[2].slice(2)} - Meme chat\n3. ${channelList[3].slice(2)} - Youtube videos\n4. ${channelList[4].slice(2)} - Out of context quotes\n\n## Many Senses of Bean\n5. {${channelList[6].slice(2)}} - Music sharing\n6. ${channelList[7].slice(2)} - Cooking\n\n## Specialty Beans\n7. ${channelList[9].slice(2)} - TTRPGs\n8. ${channelList[10].slice(2)} - Post your waifus and best girls!\n9. ${channelList[11].slice(2)} - Sandbox and adventure multiplayer games\n10. ${channelList[12].slice(3)} - Shows/Fandoms and RWBY (always use spoiler tags)\n11. ${channelList[13].slice(3)} - Pokecord channel\n12. ${channelList[14].slice(3)} - Super Smash Bros chatter\n\n## Not For Everybean\n13. ${channelList[16].slice(3)} - NSFW memes\n14. ${channelList[17].slice(3)} - 2D NSFW/Lewd\n15. ${channelList[18].slice(3)} - 3D NSFW/Lewd\n\`\`\``;

            message.channel.guild.channels.get('627033865579397141').messages.fetchPinned()
                .then(messages => messages.first().edit(menuStr))
                .catch(console.error);

            message.channel.send('Moon... Prism... POWER!');
        }

        return transform(transformation);
    },
};

/* return message.channel.guild.channels.cache
            .each(channel => {
                if (channel.id === 'category') {

                }
            })
*/