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
    /**
     * Run a single node-psql statement and return the result.
     * @param {object} stmt - A node-psql statement object.
     * @return {*} - The result of the query.
     */
    query: (async (stmt) => {
        poolLogger.info(`Starting DB query: ${stmt.text}`);
        try {
            const res = await pool.query(stmt);
            poolLogger.info(`DB query completed. Response: ${res}`);
            return res;
        }
        catch (err) {
            poolLogger.error(err);
            throw err;
        }
    }),
    /**
     * Wrap a function containing a series of database operations within a PostgreSQL transaction block.
     * @param {function} tx - A function that performs the desired operations.
     * @return {*} - The return of the provided function.
     */
    transaction: (async (tx) => {
        const client = await pool.connect();
        let res;
        try {
            await client.query('BEGIN');
            try {
                res = await tx(client);
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
    /**
     * Run a single node-psql statement without returning anything.
     * @param {object} - A node-psql statement object
     */
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
    /**
     * Run a list of independent PostgreSQL statements.
     * @param {Array} list - A list of node-psql statement objects
     */
    blkRun: (async (list) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            try {
                for (const stmt of list) {
                    await client.query(stmt);
                }
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
    }),
};