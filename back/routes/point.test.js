const request = require('supertest');
const express = require('express');
const { expect, test } = require('@jest/globals');
const db = require('../model/db');
const Model = require('../model/model');

let app;

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();

    Model.inject();
    await Model.init();

    app = express();
    app.use(express.urlencoded({ extended: false }));

    const pointRouter = require('./point');
    app.use('/point', pointRouter);
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

it('get', async () => {

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