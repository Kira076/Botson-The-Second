class PSQLHandler {
    constructor(db) {
        this.db = db;

        Object.defineProperty(this, 'client', { value: null, writable: true });

        this.listeners = new Map();

        this.getters = new Map();

        this.setters = new Map();

        /**
         * Prepackaged statement for deleting a guild's entry from a provided table
         * @param {string} table - The table to remove an entry from.
         * @param {Guild|string} guild - The guild whose entry you want to remove.
         */
        this.deleteStmt = (async (table, guild) => {
            const stmt = {
                name: 'delete',
                text: 'DELETE FROM $1 WHERE guild = $2',
                values: [table, guild],
            };
            try {
                await this.db.run(stmt);
            }
            catch (err) {
                this.db.logger.error(`Error in delete statement with vals: ${table}, ${guild}. Error: ${err}`);
            }
        });
    }

    async init(client) {
        this.client = client;

        /*
         * Create statements for standard table creation then run them as a bulk transaction through the DB handler.
         */

        const list = [];

        if (typeof list !== 'undefined' && list.length > 0) {
            try {
                await this.db.blkRun(list);
            }
            catch (err) {
                this.db.logger.error(`Failed to run initial DB statements: ${err}`);
            }
        }

        /* Listeners are optional. Can uncomment and properly fill in if listeners are needed
        this.listeners
            .set('eventToListenTo', (paramsOfEvent) => this.functionToCall)
        for (const [event, listener] of this.listeners) client.on(event, listener);
        */
    }

    /* This is only really required if listeners are registered above
    async destroy() {
        for (const [event, listener] of this.listeners) this.client.removeListener(event, listener);
        this.listeners.clear();
    }
    */

    /**
     * Access the getter for a given key.
     * @param {Guild|string} guild - The guild to pass to the getter.
     * @param {string} key - The key for the desired getter.
     */
    async get(guild, key) {
        const result = await this.getters.get(key)(guild);
        return result;
    }

    /**
     * Access the setter for a given key.
     * @param {Guild|string} guild - The guild to pass to the setter.
     * @param {string} key - The key for the desired setter.
     * @param {*} val - The value to pass and assign to the guild.
     * @returns {*} - Returns the db response if successful or false if unsuccessful.
     */
    async set(guild, key, val) {
        const response = await this.setters.get(key)(guild, val);
        return response;
    }

    /**
     * Register a new table for storing guild-specific data. Not persistent.
     * @param {string} key - The key/table name to register.
     * @param {object} stmt - The node-psql statement object to create the table.
     * @param {object} funcs - An object containing two functions, labelled getter and setter.
     */
    async registerTable(key, stmt, funcs) {
        try {
            await this.db.query(stmt);
        }
        catch (err) {
            this.db.logger.error(`Failed to register new table: ${key}, with error: ${err}`);
        }

        this.getters.set(key, funcs.getter);
        this.setters.set(key, funcs.setter);
    }
}

module.exports = PSQLHandler;