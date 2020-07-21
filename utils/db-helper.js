const Datastore = require('nedb');
const db = {};

db.altFacts = new Datastore({ filename: '../store/altFacts.db', autoload: true });

module.exports = {
    db: db,
};
