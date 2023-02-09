const { expect, test } = require('@jest/globals');
const db = require('./db');
const Note = require('./note');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.drop();
    await db.execfile('./sql/init.sql');
    await db.execfile('./sql/geo_entity.sql');
    await db.execfile('./sql/geo_point.sql');
    await db.execfile('./sql/note.sql');
    Note.client = db.client;

    await Note.init();
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
    expect(Note.sql['add']).toBeTruthy();
    expect(Note.sql['foo']).toBeUndefined();
});

test('update', async () => {
    const id = await Note.add('bb', null, null);
    const res = await Note.update(id, 'bb', null, new Date(1900, 3, 5));
    expect(res).toBe(1);
});

test('update not found', async () => {
      const res = await Note.update(9999, 'bb', null, new Date(1900, 3, 5));
    expect(res).toBe(0);
});

test('delete', async () => {
    const res = await Note.remove(24565);
    expect(res).toBe(0);
});

