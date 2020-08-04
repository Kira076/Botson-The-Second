const pino = require('pino');
const fs = require('fs');

const timestamp = new Date().toISOString().replace(/:/g, '-');
const opts = { recursive: true };

const devDest = `./logs/${timestamp}dev.log`;
const genDest = `./logs/${timestamp}gen.log`;
const guildDest = `./logs/${timestamp}guilds.log`;
const poolDest = `./logs/${timestamp}pool.log`;

fs.mkdir('./logs', opts, cb);

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

function cb(err) {
    if (err) {
        console.error(`Whoops! Failed to access or create logs directory! ${err}`);
        throw err;
    }
}