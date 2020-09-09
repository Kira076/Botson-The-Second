const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const PSQLProvider = require('./utils/db-helpers/psql-provider');


const utils = require(path.join(__dirname, 'utils', 'index.js'));
const secrets = require(path.join(__dirname, '.config', 'secrets.json'));
const config = require(path.join(__dirname, '.config', 'config.json'));

const client = new CommandoClient(config.clientOpts);

Object.defineProperty(client, 'utils', { value: utils, writable: false });
Object.defineProperty(client, 'dbHandler', { value: utils.dbHandler, writeable: false });

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['tests', 'Command group for testing new commands'],
        ['pokemon', 'Commands related to pokemon'],
        ['utilities', 'Commands for server utilities'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    utils.loggers.genLogger.info(`Logged in as ${client.user.tag}. (${client.user.id})`);
    client.user.setActivity('Robonoid under Peridot Facet 5 Cut-CMD0');
    console.log('Ready!');
});

client.on('error', (error) => {
    console.log(error);
    utils.loggers.genLogger.error(`Whoops! ${error}`);
});

client.setProvider(new PSQLProvider(utils.db));

client.login(secrets.token);