const { expect, test } = require('@jest/globals');
const db = require('./db');
const Auth = require('./auth');
const { OperationError, AuthenticationError } = require('./modelError');
const wait = require('../util/wait');


require('dotenv').config();

beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
    await db.client.query('DROP SCHEMA IF EXISTS projnote CASCADE;');
    await db.execfile('./sql/init/init.sql');
    await db.execfile('./sql/init/auth.sql');

    Auth.client = db.client;
    await Auth.init();
});

afterAll(async () => {
    await db.drop();
    await db.disconnect();
});

beforeEach(async () => {
    const sql = `delete FROM projnote.auth;
    ;`;
    await db.client.query(sql);
});

afterEach(async () => {

});

test('init', async () => {

});

test('create', async () => {
    const username = 'xyz';
    const pw = 'aabbcc3344';
    await Auth.create(username, pw);
});

test('create duplicate', async () => {
    const username = 'xyz';
    const pw = 'aabbcc3344';
    await Auth.create(username, pw);
    await expect(Auth.create(username, pw)).rejects.toThrow(OperationError);
});

test('login', async () => {
    const username = 'xyz';
    const pw = 'aabbcc3344';
    for (let i = 0; i < 20; i++) {
        await Auth.create('uunn' + String(i), 'ppww' + String(i));
    }
    const uid = await Auth.create(username, pw);
    const resId = await Auth.verify(username, pw);
    expect(resId).toBe(uid);
});


