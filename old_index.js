const Discord = require('discord.js');
const client = new Discord.Client();
const secrets = require('./.config/secrets.json');
const config = require('./.config/config.json');
const prefix = config.prefix;

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (message.content.startsWith(`${prefix}sum`)) {
        message.channel.send('Shut up, Markus...');
    }
    else if (command === 'cmd-test') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        else if (args[0] === 'kick') {
            const taggedUser = message.mentions.users.first();
            console.log('Message received');
            if (!message.mentions.users.size) {
                return message.reply('you need to take someone!');
            }
            return message.channel.send(`${taggedUser.username} should be kicked.`);
        }
        message.channel.send(`First argument: ${args[0]}`);
    }
});

client.login(secrets.token);
