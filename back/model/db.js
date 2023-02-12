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

db.execfile = async function (fpath) {
    const sql = await fs.readFile(fpath, { encoding: 'utf8' });
    return await db.client.query(sql);
}

db.create = async function () {
    const fplist = [
        './sql/init/init.sql',
        './sql/init/geo_entity.sql',
        './sql/init/geo_point.sql',
        './sql/init/note.sql',
        './sql/init/tag.sql'
    ];
    for (const fp of fplist) {
        await db.execfile(fp);
    }
}

db.drop = async function () {
    await db.execfile('./sql/drop.sql');
}

module.exports = db;
