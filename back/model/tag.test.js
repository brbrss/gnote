const { expect, test } = require('@jest/globals');
const db = require('./db');
const Tag = require('./tag');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.execfile('./sql/init.sql');
    await db.execfile('./sql/geo_entity.sql');
    await db.execfile('./sql/geo_point.sql');
    await db.execfile('./sql/note.sql');
    await db.execfile('./sql/tag.sql');
    Tag.client = db.client;

    await Tag.init();
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
    expect(Tag.sql['add']).toBeTruthy();
    expect(Tag.sql['delete']).toBeTruthy();
    expect(Tag.sql['update']).toBeTruthy();
    expect(Tag.sql['find']).toBeTruthy();
});

test('add', async () => {
    const name = 'Moo';
    const desc = 'Some moo';
    const id = await Tag.add(name, desc);
    const res = await Tag.find(id);
    expect(res.name).toBe(name);
    expect(res.description).toBe(desc);
});

test('update', async () => {
    const name = 'Moo';
    const desc = 'Some moo';
    const id = await Tag.add(name, 'wwwrong');
    await Tag.update(id, name, desc);
    const res = await Tag.find(id);
    expect(res.name).toBe(name);
    expect(res.description).toBe(desc);
});

test('delete', async () => {
    const name = 'Moo';
    const desc = 'Some moo';
    const id = await Tag.add(name, desc);
    const res = await Tag.delete(id);
    expect(res).toBe(1);
    expect(await Tag.delete(999)).toBe(0);
});
