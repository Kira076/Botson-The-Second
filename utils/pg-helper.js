const { Pool } = require('pg');
const { poolLogger } = require('../utils/loggers');
const pool = new Pool();

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', client, err);
    process.exit(-1);
});

module.exports = {
    pool: pool,
    query: (async (text, values) => {
        poolLogger.info('Starting DB query');
        const res = await pool.query(text, values);
        poolLogger.info(`DB query completed. Response: ${res}`);
    })().catch(err => poolLogger.error(err)),
};