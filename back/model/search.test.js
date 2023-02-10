const { expect, test } = require('@jest/globals');
const db = require('./db');
const Tag = require('./tag');
const Note = require('./note');
const Search = require('./search');

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
    Note.client = db.client;
    Search.client = db.client;
    await Note.init();
    await Tag.init();
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

test('search tag', async () => {
    const tid = (await Tag.findByName('c')).id;
    const param = { tag: tid };
    const res = await Search.search(param);
    expect(res).toHaveLength(3);
    expect(res[0].mycontent).toBe('note1');
    expect(res[1].mycontent).toBe('note3');
    expect(res[2].mycontent).toBe('pptr');
});

test('search text', async () => {
    const param = { text: 'tr' };
    const res = await Search.search(param);
    
    expect(res).toHaveLength(2);
    expect(res[0].mycontent).toBe('xtry');
    expect(res[1].mycontent).toBe('pptr');
});