const pino = require('pino');

const devDest = '../logs/dev.log';
const genDest = '../logs/dev.log';
const guildDest = '../logs/guilds.log';
const poolDest = '../logs/pool.log';

const devLogger = pino({ level: 'debug' }, pino.destination(devDest));
const genLogger = pino(pino.destination(genDest));
const guildLogger = pino(pino.destination(guildDest));
const poolLogger = pino(pino.destination(poolDest));

module.exports = {
    devLogger,
    genLogger,
    guildLogger,
    poolLogger,
};