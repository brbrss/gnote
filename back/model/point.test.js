const { expect, test } = require('@jest/globals');
const db = require('./db');
const Point = require('./point');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.drop();
    await db.execfile('./sql/init.sql');
    await db.execfile('./sql/geo_entity.sql');
    await db.execfile('./sql/geo_point.sql');
    Point.client = db.client;
    await Point.init();
});

afterAll(async () => {
    await db.drop();
    await db.disconnect();
});

beforeEach(async () => {
    const sql = `delete FROM projnote.geo_point;
    delete FROM projnote.geo_entity;
    ;`;
    await db.client.query(sql);
});

afterEach(async () => {

});

test('add point', async () => {
    {
        const res = await Point.add('Ottawa', 45, -75, 'This is Ottawa!');
        expect(res).toBe(1);
    }
    {
        const res = await Point.add('Quebec City', 46, -71, 'This is Quebec!');
        expect(res).toBe(2);
    }
});

test('find point', async () => {
    const id1 = await Point.add('hehe', 14, -56, null);
    const id2 = await Point.add('Some', 14, -56, 'bababa');
    let res = await Point.find(id2);
    expect(res.myid).toBe(id2);
    expect(res.myname).toBe('Some');
    expect(res.textcontent).toBe('bababa');
    res = await Point.find(id1);
    expect(res.textcontent).toBe(null);
    expect(res.myid).toBe(id1);
});

test('find not found', async () => {
    let res = await Point.find(9999);
});


test('find all', async () => {

    await Point.add('Some1', 14, -56, 'bababa1');
    await Point.add('Some2', 14, -56, 'bababa2');
    await Point.add('Some3', 14, -56, 'bababa3');

    const res = await Point.all();
    expect(res.length).toBe(3);
    expect(res[0].myname).toBe('Some1');
    expect(res[1].myname).toBe('Some2');
    expect(res[2].myname).toBe('Some3');

});

test('find all paginage default', async () => {
    for (let i = 0; i < 100; i++) {
        let s = 'pt' + String(i);
        let desc = 'desc' + String(i);
        await Point.add(s, i, -i, 'bababa1');
    }

    {
        const res = await Point.all(0);
        console.log(res);
        expect(res.length).toBe(10);
        expect(res[0].myname).toBe('pt0');
        expect(res[9].myname).toBe('pt9');
    }
    {
        const res = await Point.all(10);
        expect(res.length).toBe(10);
        expect(res[0].myname).toBe('pt10');
        expect(res[9].myname).toBe('pt19');
    }
    {
        const res = await Point.all(90);
        expect(res.length).toBe(10);
        expect(res[0].myname).toBe('pt90');
        expect(res[9].myname).toBe('pt99');
    }

});

test('find all paginage', async () => {
    for (let i = 0; i < 100; i++) {
        let s = 'pt' + String(i);
        let desc = 'desc' + String(i);
        await Point.add(s, i, -i, 'bababa1');
    }

    {
        const res = await Point.all(33, 4);
        expect(res.length).toBe(4);
        expect(res[0].myname).toBe('pt33');
        expect(res[3].myname).toBe('pt36');
    }
    {
        const res = await Point.all(37, 4);
        expect(res.length).toBe(4);
        expect(res[0].myname).toBe('pt37');
        expect(res[3].myname).toBe('pt40');
    }
});