const pino = require('pino');

const devDest = '../logs/dev.log';
const genDest = '../logs/dev.log';
const guildDest = '../logs/guilds.log';

const devLogger = pino(pino.destination(devDest));
const genLogger = pino(pino.destination(genDest));
const guildLogger = pino(pino.destination(guildDest));

module.exports = {
    devLogger,
    genLogger,
    guildLogger,
};