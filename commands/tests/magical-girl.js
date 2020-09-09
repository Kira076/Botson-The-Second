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
        const clnt = this.client;
        let transform;
        for (const file of transformationFiles) {
            if (file === `${transformation}.json`) {
                transform = require(`../../transformations/${file}`);
            }
        }

        async function activation(trans) {
            const channelList = [];
            // let menuChannel;
            try {
                for (const channel in trans) {
                    await message.channel.guild.channels.cache.get(channel)
                        .setName(trans[channel]);
                    channelList.push(trans[channel]);
                }
            }
            catch (err) {
                console.log(err);
                clnt.utils.loggers.genLogger.error(`Unable to rename some or all channels: ${err}`);
            }
            const menuList = [];
            for (const channel in channelList) {
                menuList.push(channel.replace('-', '. '));
            }
            const menuStr = `\`\`\`markdown\n# Channel Directory\n## ${menuList[0]}\n${menuList[1]} - General Chat\n${menuList[2]} - Meme chat\n${menuList[3]} - Youtube videos\n${menuList[4]} - Out of context quotes\n\n## ${menuList[5]}\n{${menuList[6]}} - Music sharing\n${menuList[7]} - Cooking\n\n## ${menuList[8]}\n7. ${menuList[9]} - TTRPGs\n${menuList[10]} - Post your waifus and best girls!\n${menuList[11]} - Sandbox and adventure multiplayer games\n${menuList[12]} - Shows/Fandoms and RWBY (always use spoiler tags)\n${menuList[13]} - Pokecord channel\n${menuList[14]} - Super Smash Bros chatter\n\n## ${menuList[15]}\n${menuList[16]} - NSFW memes\n${menuList[17]} - 2D NSFW/Lewd\n${menuList[18]} - 3D NSFW/Lewd\n\`\`\``;
            console.log('Starting the fetch');
            // message.channel.guild.channels.cache.get('626890547532922900').fetch()
            message.channel.guild.channels.cache.get('626890547532922900')
                .then(channel => {
                // Change this to delete and uncomment the following send command if a new message needs to be sent
                // Such as in order to have a bot message to edit on further transformations, or if sending a new message each time is better
                    console.log('fetch completed');
                    channel.messages.fetch('709242997581021214')
                        .then(direc => {
                            direc.edit(menuStr);
                        });
                // channel.send(menuStr);
                })
                .catch(console.error);
            /**
             * try {
                menuChannel = await message.channel.guild.channels.cache.get('626890547532922900').fetch();
            }
            catch (err) {
                console.log(err);
                clnt.utils.loggers.genLogger.error(`Unable to update menu channel: ${err}`);
            }
            finally {
                menuChannel.messages.cache.first().edit(menuStr);
                message.say('Moon... Prism... POWER!');
            }*/
            message.say('Moon... Prism... POWER!');
        }
        return activation(transform);
    }
};