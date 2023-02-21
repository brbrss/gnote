const { expect, test } = require('@jest/globals');
const db = require('./db');
const { NotFoundError, InputError } = require('./modelError');
const Note = require('./note');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.drop();
    await db.execfile('./sql/init/init.sql');
    await db.execfile('./sql/init/geo_entity.sql');
    await db.execfile('./sql/init/geo_point.sql');
    await db.execfile('./sql/init/note.sql');
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

test('find', async () => {
    await Note.add('aa', null, null);
    await Note.add('aa', null, null);
    const id = await Note.add('bb', null, new Date(1923, 4, 5));
    await Note.add('aa', null, null);
    await Note.add('aa', null, null);
    const res = await Note.find(id);
    expect(res.content).toBe('bb');
    expect(new Date(res.time_event)).toEqual(new Date(1923, 4, 5));
});

test('find notfound', async () => {
    await expect(Note.find(998876)).rejects.toThrow(NotFoundError);
});

test('add bad geo id', async () => {
    await expect(Note.add('bb', 987, null)).rejects.toThrow(InputError);
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
    const res1 = await Note.delete(24565);
    expect(res1).toBe(0);
    const id = await Note.add('aaaaaaa', null, new Date(1950, 6, 13));
    const res2 = await Note.delete(id);
    expect(res2).toBe(1);
});

