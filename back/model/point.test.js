const { expect, test } = require('@jest/globals');
const db = require('./db');
const Point = require('./point');
require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.create();
    Point.client = db.client;
});

afterAll(async () => {
    await db.drop();
    await db.disconnect();
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
    {
        const insertedId = await Point.add('Some', 14, -56, 'bababa');
        const res = await Point.find(insertedId);
        expect(res.myid).toBe(insertedId);
        expect(res.myname).toBe('Some');
        expect(res.textcontent).toBe('bababa');

    }
});


