const request = require('supertest');
const express = require('express');
const { expect, test } = require('@jest/globals');
const db = require('./model/db');
//const Model = require('./model/model');

let app;

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
});

afterEach(async () => {
});

it('point/ put get', async () => {

    const res = await request(app)
        .put('/point')
        .type('form')
        .send({ name: "hahaha", lon: 12, lat: 55, comment: 'llww' });

    expect(res.body.id).not.toBeNull();

    const res2 = await request(app)
        .get('/point/' + res.body.id);
    expect(res2.body.name).toBe("hahaha");
    expect(res2.body.desc).toBe("llww");
});

it('note/ put get', async () => {

    const res = await request(app)
        .put('/note')
        .type('form')
        .send({ content: "rfvedc", geo: null, time: new Date(1953, 12, 3) });

    expect(Number(res.body.id)).toBeGreaterThan(0);

    const res2 = await request(app)
        .get('/note/' + res.body.id);
    expect(res2.status).toBe(200);
    expect(res2.body.content).toBe("rfvedc");
});
