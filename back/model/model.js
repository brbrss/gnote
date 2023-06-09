const Note = require('./note');
const Point = require('./point');
const Tag = require('./tag');
const Search = require('./search');
const db = require('./db');
const Auth = require('./auth');


async function inject() {
    await db.connect();
    Note.client = db.client;
    Point.client = db.client;
    Tag.client = db.client;
    Search.client = db.client;
    Auth.client = db.client;
}

async function init() {
    await inject();
    await Note.init();
    await Point.init();
    await Tag.init();
    await Search.init();
    await Auth.init();
}

async function resetSchema() {
    await db.connect();
    await db.drop();
    await db.create();
    await db.disconnect();
    console.log('Schema created');
}

module.exports = { init, resetSchema };
