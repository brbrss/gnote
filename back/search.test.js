const request = require('supertest');
const express = require('express');
const { expect, test } = require('@jest/globals');
const db = require('./model/db');
//const Model = require('./model/model');

const TAG_DATA = {
    'animal': '',
    'stone':'',
    'dog': 'animal',
    'fish': 'animal',
    'golden': 'dog',
    'bark': 'dog',
    'fin': 'fish'
};

const NOTE_DATA = [
    { content: "xa", geo: null, time: new Date(2050, 5, 8), tagList: ['bark', 'fish'] },
    { content: "xb", geo: null, time: new Date(2050, 5, 8), tagList: ['golden'] },
    { content: "xc", geo: null, time: new Date(2050, 5, 8), tagList: ['dog'] },
    { content: "xd", geo: null, time: new Date(2050, 5, 8), tagList: ['bark', 'fin'] },
];


let app;

const tagMap = {};

function getTid(arr) {
    return arr.map(t => tagMap[t]);
}

async function insertData() {
    for (const k in TAG_DATA) {
        const v = TAG_DATA[k];
        let i = '';
        if (v) {
            i = tagMap[v]
        }
        const res = await request(app)
            .post('/api/tag/item')
            .type('form')
            .send({ name: k, description: '', parent: i });
        tagMap[k] = res.body.id;
    }

    for (const note of NOTE_DATA) {
        const tList = note.tagList.map(tt => tagMap[tt]);
        await request(app)
            .post('/api/note')
            .type('form')
            .send({ ...note, tagList: tList });
    }

}

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    app = require('./app');
});

afterAll(async () => {
    db.disconnect();
});


beforeEach(async () => {
    await db.drop();
    await db.create();
    await insertData();
});

afterEach(async () => {
});

it('setup', async () => {
        const tagId = getTid(['fish', 'bark']);
        expect(tagId[0]).toBeDefined();
        expect(tagId[1]).toBeDefined();
});


it('search/ tag', async () => {

    {
        const tagId = getTid(['fish', 'bark']);
        const res = await request(app)
            .post('/api/search')
            .type('form')
            .send({ text: 'x', tagId: tagId });
        expect(res.body).toHaveLength(2);
        expect(res.body[0].content).toBe('xa');
        expect(res.body[1].content).toBe('xd');
    }
});