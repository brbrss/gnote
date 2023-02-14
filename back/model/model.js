const Note = require('./note');
const Point = require('./point');
const Tag = require('./tag');
const Search = require('./search');
const db = require('./db');



function inject() {
    Note.client = db.client;
    Point.client = db.client;
    Tag.client = db.client;
    Search.client = db.client;
}

async function init() {
    await Note.init();
    await Point.init();
    await Tag.init();
    await Search.init();
}

module.exports = { inject, init };
