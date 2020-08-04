const { Pool } = require('pg');
const { poolLogger } = require('../utils/loggers');
const { pgConfig } = require('../.config/secrets.json');
const pool = new Pool(pgConfig);

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', client, err);
    process.exit(-1);
});

module.exports = {
    pool: pool,
    logger: poolLogger,
    query: (async (text, values) => {
        poolLogger.info(`Starting DB query: ${text}`);
        try {
            const res = await pool.query(text, values);
            poolLogger.info(`DB query completed. Response: ${res}`);
            return res;
        }
        catch (err) {
            poolLogger.error(err);
            throw err;
        }
    }),
    transaction: (async (tx) => {
        const client = await pool.connect();
        let res;
        try {
            await client.query('BEGIN');
            try {
                res = await client.query(tx);
                await client.query('COMMIT');
            }
            catch (err) {
                await client.query('ROLLBACK');
                throw err;
            }
        }
        finally {
            client.release();
        }
        return res;
    }),
    run: (async (stmt) => {
        poolLogger.info(`Running DB command: ${stmt.text}`);
        try {
            const res = await pool.query(stmt);
            poolLogger.info(`DB command completed. Response: ${res}`);
        }
        catch (err) {
            poolLogger.error(err);
            throw err;
        }
    }),
};