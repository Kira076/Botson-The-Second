const { Command } = require('discord.js-commando');
const fs = require('fs');
const transformationFiles = fs.readdirSync('./transformations').filter(file => file.endsWith('.json'));
const validArgs = [];
transformationFiles.forEach(file => {
    validArgs.push(file.slice(0, -5));
});
console.log(validArgs);

module.exports = class MeowCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'magical-girl',
            aliases: [],
            group: 'utilities',
            memberName: 'magical-girl',
            description: 'Activate a Magical Transformation!',
            args: [
                {
                    key: 'transformation',
                    prompt: 'What transformation would you like to activate?',
                    type: 'string',
                },
            ],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 10,
            },
            // https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR'],
            ownerOnly: false,
        });
    }

    // eslint-disable-next-line no-unused-vars
    run(message, { transformation }) {
        let transform;
        for (const file of transformationFiles) {
            if (file === `${transformation}.json`) {
                transform = require(`../transformations/${file}`);
            }
        }

        async function activation(trans) {
            const channelList = [];
            try {
                for (const channel in trans) {
                    await message.channel.guild.channels.cache.get(channel)
                        .setName(trans[channel]);
                    channelList.push(trans[channel]);
                }
            }
            catch (err) {
                this.client.utils.loggers.genLogger.error(`Unable to rename some or all channels: ${err}`);
            }
            let menuList;
            for (const channel in channelList) {
                menuList.push(channel.replace('-', '. '));
            }
            const menuStr = `\`\`\`markdown\n# Channel Directory\n## ${menuList[0]}\n${menuList[1]} - General Chat\n${menuList[2]} - Meme chat\n${menuList[3]} - Youtube videos\n${menuList[4]} - Out of context quotes\n\n## ${menuList[5]}\n{${menuList[6]}} - Music sharing\n${menuList[7]} - Cooking\n\n## ${menuList[8]}\n7. ${menuList[9]} - TTRPGs\n${menuList[10]} - Post your waifus and best girls!\n${menuList[11]} - Sandbox and adventure multiplayer games\n${menuList[12]} - Shows/Fandoms and RWBY (always use spoiler tags)\n${menuList[13]} - Pokecord channel\n${menuList[14]} - Super Smash Bros chatter\n\n## ${menuList[15]}\n${menuList[16]} - NSFW memes\n${menuList[17]} - 2D NSFW/Lewd\n${menuList[18]} - 3D NSFW/Lewd\n\`\`\``;

            try {
                const menuChannel = await message.channel.guild.channels.cache.get('626890547532922900').fetch();
                await menuChannel.messages.cache.first().edit(menuStr);
            }
            catch (err) {
                this.client.utils.loggers.genLogger.error(`Unable to update menu channel: ${err}`);
            }
            finally {
                message.say('Moon... Prism... POWER!');
            }
        }
        return activation(transform);
    }
};