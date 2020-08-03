const fs = require('fs');
const axios = require('axios').default;
const Discord = require('discord.js');
const client = new Discord.Client();
const secrets = require('./.config/secrets.json');
const config = require('./.config/config.json');
const prefix = config.prefix;
const cooldowns = new Discord.Collection();
const { db } = require('./utils/db-helper');
const { pool } = require('./utils/pg-helper');
const loggers = require('./utils/loggers');


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const libs = { axios, db, pool, loggers };

for (const file of commandFiles) {
    if (file !== 'command-template') {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('guildCreate', (guild) => {
    loggers.guildLogger.info(`Joined guild: ${guild}`);
    (async () => {
        const dbClient = await pool.connect();
        try {
            const res = await dbClient
                .query('CREATE TABLE $1_alt_pokefax ( _id serial PRIMARY KEY, pokemon varchar(32) NOT NULL, fact varchar(256) NOT NULL', [guild.id]);
            loggers.guildLogger.info(`Created db table for ${guild.id}`);
            loggers.guildLogger.info(`Database responded: ${res}`);
        }
        finally {
            client.release();
        }
    })().catch(err => loggers.genLogger.error(err));
});

client.on('guildDelete', (guild) => {
    loggers.guildLogger.info(`Left guild: ${guild}`);
});

client.on('message', message => {
    /* if (message.author.id === '160217975285219328') {
        message.delete();
        console.log('Uhhh?');
    }*/

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, libs);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(secrets.token);
