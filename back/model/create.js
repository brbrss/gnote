/**
 * Create schema and tables in postgres
 */


require('dotenv').config();
const { Client } = require('pg');


const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

async function f() {
    const client = new Client(config);
    await client.connect();
    {
        const res = await client.query('SELECT $1::text as message', ['Hello world!'])
        console.log(res.rows); // Hello world!
    }
    {
        const res = await client.query('CREATE SCHEMA IF NOT EXISTS youschema;');
        console.log(res.rows);

    }
    {
        const sql = `CREATE TABLE youschema.notes
            (
                id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                name text,
                PRIMARY KEY (id)
            );`;
        const res = await client.query(sql);
        console.log(res.rows);
    }
    {
        // load postgis
        const sql = `CREATE EXTENSION  IF NOT EXISTS  postgis`;
    }
    await client.end();
    return;
}

f();