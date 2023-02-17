const { expect, test } = require('@jest/globals');
const db = require('./db');
const Tag = require('./tag');
const Note = require('./note');
const Point = require('./point');
const Search = require('./search');

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
    Search.client = db.client;
    Point.client = db.client;
    await Note.init();
    await Tag.init();
    await Point.init();
    await Search.init();
});

afterAll(async () => {
    await db.drop();
    await db.disconnect();
});



const TAG_LIST = ['a', 'aa', 'aaa', 'b', 'bb', 'bba', 'bbb', 'bbba', 'bc', 'c', 'cc', 'ccc', 'd'];
const NOTE_LIST = {
    'note1': ['cc', 'bbba'],
    'note2': ['a', 'bb'],
    'note3': ['a', 'ccc'],
    'xtry': [],
    'pptr': ['c']
};

beforeEach(async () => {
    const sql = `delete FROM projnote.note;
    delete FROM projnote.tag;
    delete FROM projnote.note_tag;
    ;`;
    await db.client.query(sql);

    const tag_dict = { '': null };
    for (const t of TAG_LIST) {
        const parent = t.slice(0, t.length - 1);
        const pid = tag_dict[parent];
        const id = await Tag.add(t, '', pid);
        tag_dict[t] = id;
    }

    for (const notename in NOTE_LIST) {
        const id = await Note.add(notename, null, null);
        for (const tagname of NOTE_LIST[notename]) {
            const tid = tag_dict[tagname];
            await Tag.addToNote(id, tid);
        }
    }
});

afterEach(async () => {

});

test('setup', async () => {

});

test('search unrestricted', async () => {
    const param = {tag:null };
    const res = await Search.search(param);
    expect(res).toHaveLength(5);
});


test('search tag', async () => {
    const tid = (await Tag.findByName('c')).id;
    const param = { tag: tid };
    const res = await Search.search(param);
    expect(res).toHaveLength(3);
    expect(res[0].content).toBe('note1');
    expect(res[1].content).toBe('note3');
    expect(res[2].content).toBe('pptr');
});

test('search text', async () => {
    const param = { text: 'tr' };
    const res = await Search.search(param);

    expect(res).toHaveLength(2);
    expect(res[0].content).toBe('xtry');
    expect(res[1].content).toBe('pptr');
});


test('search within distance', async () => {
    const data =
        [-79.38406800127191, 43.6422200106563,
        -79.3712669943727, 43.6494610001075,
        -79.3825739992347, 43.6451529957272];
    let pid = [];
    for (let i = 0; i < data.length / 2; i++) {
        let id = await Point.add('p' + String(i), data[i * 2], data[i * 2 + 1], '')
        pid.push(id);
    }
    await Note.add('n1', pid[1], null);
    await Note.add('n2', pid[2], null);
    await Note.add('n3', pid[2], null);
    await Note.add('n4', pid[0], null);
    await Note.add('n5', null, null);
    const param = { wdist: { x: -79.38, y: 43.64, dist: 1200 } };
    const res = await Search.search(param);
    expect(res).toHaveLength(3);
    expect(res[0].content).toBe('n2');
    expect(res[1].content).toBe('n3');
    expect(res[2].content).toBe('n4');
});