require('dotenv').config();
const fs = require('fs/promises');
const { Client } = require('pg');

const db = { client: null };

db.config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};
db.connect = async function () {
    db.client = new Client(db.config);
    db.client.connect();
    return db.client;
}

db.disconnect = async function () {
    await db.client.end();
}

db.create = async function () {
    const sql = await fs.readFile('./model/init.sql', { encoding: 'utf8' });
    return await db.client.query(sql);
}

db.drop = async function () {
    const sql = await fs.readFile('./model/drop.sql', { encoding: 'utf8' });
    return await db.client.query(sql);
}

module.exports = db;
