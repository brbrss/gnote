const request = require('supertest');
const express = require('express');
const { expect, test } = require('@jest/globals');
const db = require('../model/db');
const Auth = require('../model/auth');
let app;


beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    app = require('../app');
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


it('not logged in', async () => {
    const res = await request(app)
        .get('/api/auth');
    expect(res.status).toBe(200);
    expect(res.body).toEqual('');
});

it('log in', async () => {
    let uid=-1;
    {
        const res = await request(app)
            .post('/api/auth/signup')
            .type('form')
            .send({ username: 'abcd', password: 'qwer' });
        expect(res.status).toBe(201);
        uid = res.body.uid;
    }

    const agent = request.agent(app);
    {
        const res = await agent
            .post('/api/auth/login')
            .type('form')
            .send({ username: 'abcd', password: 'qwer' });;
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe('login succeeded');
    }
    {
        const res = await agent
            .get('/api/auth');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id:uid });
    }
    {
        const res = await agent
            .post('/api/auth/logout');
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe('logout succeeded');
    }
    {
        const res = await agent
            .get('/api/auth');
        expect(res.status).toBe(200);
        expect(res.body).toEqual('');
    }
});
