const Note = require('./note');
const Point = require('./point');
const Tag = require('./tag');
const Search = require('./search');
const db = require('./db');



async function inject() {
    await db.connect();
    Note.client = db.client;
    Point.client = db.client;
    Tag.client = db.client;
    Search.client = db.client;
}

async function init() {
    await inject();
    await Note.init();
    await Point.init();
    await Tag.init();
    await Search.init();
}

module.exports = { init };
