const Datastore = require('nedb');
const storage = {};

storage.altFacts = new Datastore({ filename: './store/altFacts.db', autoload: true });

module.exports = {
    storage,
};
