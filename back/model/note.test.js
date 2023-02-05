const { expect, test } = require('@jest/globals');
const db = require('./db');
const Note = require('./note');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.create();
    Note.client = db.client;
});

afterAll(async () => {
    await db.drop();
    await db.disconnect();
});

beforeEach(async () => {

});

afterEach(async () => {

});

test('init', async () => {
    await Note.init();
    expect(Note.sql['add']).toBeTruthy();
    expect(Note.sql['foo']).toBeUndefined();
});
