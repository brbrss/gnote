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
        .post('/api/point')
        .type('form')
        .send({ name: "hahaha", lon: 12, lat: 55, comment: 'llww' });

    expect(res.body.id).not.toBeNull();

    const res2 = await request(app)
        .get('/api/point/' + res.body.id);
    expect(res2.body.name).toBe("hahaha");
    expect(res2.body.desc).toBe("llww");
});

it('point/ get error', async () => {
    const res2 = await request(app)
        .get('/api/point/' + 789);
    expect(res2.status).toBe(404);
    expect(res2.body).toEqual({});
});


it('note/ create get', async () => {

    const res = await request(app)
        .post('/api/note')
        .type('form')
        .send({ content: "rfvedc", geo: null, time: new Date(1953, 12, 3) });

    expect(Number(res.body.id)).toBeGreaterThan(0);

    const res2 = await request(app)
        .get('/api/note/' + res.body.id);
    expect(res2.status).toBe(200);
    expect(res2.body.content).toBe("rfvedc");
});

it('note/ create missing', async () => {
    const res = await request(app)
        .post('/api/note')
        .type('form')
        .send({ content: "rfvedc", geo: null });

    expect(res.status).toBe(400);
});

it('note/ create err', async () => {
    const res = await request(app)
        .post('/api/note')
        .type('form')
        .send({ content: "rfvedc", geo: 'ggg' });

    expect(res.status).toBe(400);
});

it('note/ update', async () => {
    let id;
    {
        const res = await request(app)
            .post('/api/note')
            .type('form')
            .send({ content: "rfvedc", geo: null, time: new Date(1953, 12, 3) });
        expect(Number(res.body.id)).toBeGreaterThan(0);
        id = Number(res.body.id);
    }
    {
        const res = await request(app)
            .put('/api/note/' + id)
            .type('form')
            .send({ content: "asdf", geo: null, time: new Date(1953, 12, 3) });
        expect(res.body).toEqual({ rowCount: 1 });
    }
    {
        const res = await request(app)
            .get('/api/note/' + id);
        expect(res.body.content).toBe("asdf");
    }
});

it('note/ update missing', async () => {
    const res = await request(app)
        .put('/api/note/' + 4567)
        .type('form')
        .send({ content: "asdf", time: new Date(1953, 12, 3) })
    expect(res.status).toBe(400);
});

it('note/ update error', async () => {
    const res = await request(app)
        .put('/api/note/' + 4567)
        .type('form')
        .send({ content: "asdf", geo: null, time: new Date(1953, 12, 3) })
    expect(res.status).toBe(400);
});

it('note/ delete', async () => {
    let id;
    {
        const res = await request(app)
            .post('/api/note')
            .type('form')
            .send({ content: "rfvedc", geo: null, time: new Date(1953, 12, 3) });
        expect(Number(res.body.id)).toBeGreaterThan(0);
        id = Number(res.body.id);
    }
    {
        const res = await request(app)
            .delete('/api/note/' + String(5555));
        expect(res.body).toEqual({ rowCount: 0 });
    }
    {
        const res = await request(app)
            .delete('/api/note/' + id);
        expect(res.body).toEqual({ rowCount: 1 });
    }
    {
        const res = await request(app)
            .delete('/api/note/' + id);
        expect(res.body).toEqual({ rowCount: 0 });
    }

});

it('search/ ', async () => {
    let id;
    {
        await request(app)
            .post('/api/note')
            .type('form')
            .send({ content: "bbgg", geo: null, time: null });

        const res = await request(app)
            .post('/api/note')
            .type('form')
            .send({ content: "rfvedc", geo: null, time: new Date(1953, 12, 3) });
        expect(Number(res.body.id)).toBeGreaterThan(0);
        id = Number(res.body.id);
    }
    {
        const res = await request(app)
            .post('/api/search')
            .type('form')
            .send('');
        expect(res.body).toHaveLength(2);
        expect(res.body[1].content).toBe('rfvedc');
    }


});

it('tag/ add', async () => {
    const res = await request(app)
        .post('/api/tag/')
        .type('form')
        .send({ name: 'real', description: 'good', parent: '' })
    expect(res.status).toBe(201);
});

it('tag/ search', async () => {
    const d = ['bat', 'bet', 'hht', 'hat', 'ate', 'ktee'];
    for (const t of d) {
        await request(app)
            .post('/api/tag/')
            .type('form')
            .send({ name: t, description: 'good', parent: '' })
    }
    const res = await request(app).get('/api/tag/search/' + 'at');
    expect(res.status).toBe(201);
    expect(res.body.map(obj => obj.name)).toEqual(['ate', 'bat', 'hat']);
});
