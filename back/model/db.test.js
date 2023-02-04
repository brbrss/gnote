
const db = require('./db');
require('dotenv').config();



beforeAll(async () => {
    db.config.database = process.env.DB_TESTDB;
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('db connection', () => {
    ;
});

test('init and destroy schema', async () => {
    await db.create();
    await db.drop();
});

test('db select hello', async () => {
    const val = 'hello';
    const res = await db.client.query('SELECT $1 as qwe;',[val]);
    expect(res.rows[0]['qwe']).toBe(val);
});
