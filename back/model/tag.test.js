const { expect, test } = require('@jest/globals');
const db = require('./db');
const Tag = require('./tag');
const Note = require('./note');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.execfile('./sql/init/init.sql');
    await db.execfile('./sql/init/geo_entity.sql');
    await db.execfile('./sql/init/geo_point.sql');
    await db.execfile('./sql/init/note.sql');
    await db.execfile('./sql/init/tag.sql');
    Tag.client = db.client;
    Note.client = db.client;
    await Note.init();
    await Tag.init();
});

afterAll(async () => {
    await db.drop();
    await db.disconnect();
});

beforeEach(async () => {
    const sql = `delete FROM projnote.note;
    delete FROM projnote.tag;
    delete FROM projnote.note_tag;
    ;`;
    await db.client.query(sql);
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

test('add null', async () => {
    const desc = 'Some moo';
    await expect(Tag.add(null, desc)).rejects.toThrow();
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

test('find by name', async () => {
    const name = 'Moo';
    const desc = 'Some moo';
    await Tag.add('bla', '');
    const id = await Tag.add(name, desc);
    await Tag.add('wmm', '');

    const res = await Tag.findByName(name);
    expect(res.id).toBe(id);
    expect(res.name).toBe(name);
    expect(res.description).toBe(desc);

});


test('tag note', async () => {
    const id = await Note.add('note text', null, null);
    const good = await Tag.add('good', 'so good');
    const bad = await Tag.add('bad', 'so bad');
    const ugly = await Tag.add('ugly', 'so ugly');
    // tag note
    expect(await Tag.addToNote(id, bad)).toBe(1);
    await Tag.addToNote(id, good);
    // note has tag
    {
        const res = await Tag.findByNote(id);
        expect(res.map(obj => obj.name)).toEqual(['good', 'bad']);
    }
    await Tag.removeFromNote(id, bad);
    {
        const res = await Tag.findByNote(id);
        expect(res.map(obj => obj.name)).toEqual(['good']);
    }
    // tag relation should be deleted when note is deleted
    await Note.delete(id);
    {
        const res = await Tag.findByNote(id);
        expect(res.map(obj => obj.name)).toEqual([]);
    }
});

test('tag note other', async () => {
    const id1 = await Note.add('note text', null, null);
    const id2 = await Note.add('other text', null, null);

    const good = await Tag.add('good', 'so good');
    const bad = await Tag.add('bad', 'so bad');
    const ugly = await Tag.add('ugly', 'so ugly');

    await Tag.addToNote(id1, good);
    {
        const res = await Tag.findByNote(id2);
        expect(res).toEqual([]);
    }
    {
        const res = await Tag.findByNote(id1);
        expect(res.map(obj => obj.name)).toEqual(['good']);
    }
});

test('no unique tag in note', async () => {
    const id = await Note.add('note text', null, null);
    const good = await Tag.add('good', 'so good');

    await Tag.addToNote(id, good);

    await expect(Tag.addToNote(id, good)).rejects.toThrow();
});

test('tag search', async () => {
    const d = {
        'bad 00xyp': 'b',
        'xyb': 'fff',
        'xYa': 'fff',
        'a4': 'uuxyuu',
        'a5': null,
        'b': 'iixy',
        'real xyi': null,
        'Z': 'pp'
    };

    for (const k in d) {
        await Tag.add(k, d[k]);
    }
    {
        const res = await Tag.textSearch('z', 10);
        const target = ['Z'];
        expect(res.map(obj => obj.name)).toEqual(target);
    }
    {
        const res = await Tag.textSearch('xy', 10);
        const target = ['xYa', 'xyb', 'bad 00xyp', 'real xyi', 'a4', 'b'];
        expect(res.map(obj => obj.name)).toEqual(target);
    }
    { // case
        const res = await Tag.textSearch('Xy', 10);
        const target = ['xYa', 'xyb', 'bad 00xyp', 'real xyi', 'a4', 'b'];
        expect(res.map(obj => obj.name)).toEqual(target);
    }
    {
        const res = await Tag.textSearch('xy', 3);
        const target = ['xYa', 'xyb', 'bad 00xyp'];
        expect(res.map(obj => obj.name)).toEqual(target);
    }

});

test('tag parent', async () => {
    let a = { name: 'a5', description: 'a', parent: null };
    let i0 = await Tag.add(a.name, a.description, a.parent);
    let b = { name: 'bc', description: 'b', parent: i0 };
    let i1 = await Tag.add(b.name, b.description, b.parent);
    let c = { name: 'a6', description: 'c', parent: i1 };
    let i2 = await Tag.add(c.name, c.description, c.parent);

    {
        const res = await Tag.textSearch('6', 10);
        expect(res).toHaveLength(1);
        expect(res[0].parent).toEqual(c.parent);
    }
    {
        const res = await Tag.find(i1);
        expect(res.parent).toBe(i0);
    }
});
