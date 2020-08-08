const PSQLHandler = require('./db-helpers/psql-handler');
const db = require('./pg-helper');
const dbHandler = new PSQLHandler(db);
const _ = require('lodash');

const stmt1 = {
    text: 'CREATE TABLE IF NOT EXISTS poke_alt_facts (guild BIGINT PRIMARY KEY, facts TEXT)',
    vals: [],
};

const alt_fax_funcs = {
/**
 * Getter for poke-alt-facts.
 * @param {Guild|string} guild - The guild to get alt facts for.
 * @returns {object} - An object containing all of the poke-alt-facts for the given guild.
 */
    async getter(guild) {
        const stmt = {
            text: 'SELECT facts FROM poke_alt_facts WHERE guild = $1',
            values: [guild],
        };
        let facts;

        /**
     * Make the DB query to find all of the facts for this guild and parse the result.
     */
        try {
            const res = await db.query(stmt);
            // db.devLogger.debug(`Res returned from alt-fax get: ${res}`);
            console.log(JSON.stringify(res.rows));
            console.log(JSON.stringify(res.rows[0]));
            facts = JSON.parse(res.rows[0]['facts']);
        }
        catch (err) {
            db.logger.error(`Failed to find an alt facts object for guild: ${guild} with error: ${err}`);
            return {};
        }
        // Originally designed to select a random fact. Now intended to return the whole of the alt facts object for the guild.
        // const chosenPokemon = _.sample(facts);
        // const chosenFact = _.sample(chosenPokemon);

        return facts;
    },
    /**
 * Setter for poke-alt-facts. Enables the setting of guild-specific alt facts.
 * @param {Guild|string} guild - The guild to add the fact to.
 * @param {string} pokemon - The name of the pokemon for the fact to be added to.
 * @param {string} fact - A string representing the fact to add.
 * @returns {object|boolean} - Returns either the db response or false if it failed to add.
 */
    async setter(guild, val) {
        const { pokemon, fact } = val;
        let factsObject = await alt_fax_funcs.getter(guild);

        if(typeof factsObject !== 'undefined' && _.indexOf(Object.keys(factsObject), pokemon) > 0) {
            factsObject[pokemon].push(fact);
        }
        else {
            factsObject = {
                [pokemon]: [
                    fact,
                ],
            };
        }

        JSON.stringify(factsObject);

        const stmt = {
            text: 'INSERT INTO poke_alt_facts VALUES ($1, $2)',
            values: [guild, factsObject],
        };

        try {
            return await db.run(stmt);
        }
        catch (err) {
            db.logger.error(`Failed to set alternative poke fact for ${pokemon}: ${fact}, with error: ${err}`);
            return false;
        }
    },
};

dbHandler.registerTable('poke-alt-facts', stmt1, alt_fax_funcs);

module.exports = {
    db,
    dbHandler,
};