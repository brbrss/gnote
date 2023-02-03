
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

