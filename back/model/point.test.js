const { expect, test } = require('@jest/globals');
const db = require('./db');
const { NotFoundError } = require('./modelError');
const Point = require('./point');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.drop();
    await db.execfile('./sql/init/init.sql');
    await db.execfile('./sql/init/geo_entity.sql');
    await db.execfile('./sql/init/geo_point.sql');
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
    expect(res.id).toBe(id2);
    expect(res.name).toBe('Some');
    expect(res.desc).toBe('bababa');
    expect(JSON.parse(res.shape)).toEqual({ type: 'Point', coordinates: [14, -56] });
    res = await Point.find(id1);
    expect(res.desc).toBe(null);
    expect(res.id).toBe(id1);
});

test('find not found', async () => {
    await expect(Point.find(9999)).rejects.toThrow(NotFoundError);
});


test('find all', async () => {

    await Point.add('Some1', 14, -56, 'bababa1');
    await Point.add('Some2', 14, -56, 'bababa2');
    await Point.add('Some3', -55.5, 12.3, 'bababa3');

    const res = await Point.all();
    expect(res.length).toBe(3);
    expect(res[0].name).toBe('Some1');
    expect(res[1].name).toBe('Some2');
    expect(res[2].name).toBe('Some3');
    expect(JSON.parse(res[2].shape)).toEqual({ type: 'Point', coordinates: [-55.5, 12.3] });

});

test('find all paginage default', async () => {
    for (let i = 0; i < 100; i++) {
        let s = 'pt' + String(i);
        let desc = 'desc' + String(i);
        await Point.add(s, i, -i, 'bababa1');
    }

    {
        const res = await Point.all(0);
        expect(res.length).toBe(10);
        expect(res[0].name).toBe('pt0');
        expect(res[9].name).toBe('pt9');
    }
    {
        const res = await Point.all(10);
        expect(res.length).toBe(10);
        expect(res[0].name).toBe('pt10');
        expect(res[9].name).toBe('pt19');
    }
    {
        const res = await Point.all(90);
        expect(res.length).toBe(10);
        expect(res[0].name).toBe('pt90');
        expect(res[9].name).toBe('pt99');
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
        expect(res[0].name).toBe('pt33');
        expect(res[3].name).toBe('pt36');
    }
    {
        const res = await Point.all(37, 4);
        expect(res.length).toBe(4);
        expect(res[0].name).toBe('pt37');
        expect(res[3].name).toBe('pt40');
    }
});