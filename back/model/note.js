const fs = require('fs/promises');


const Note = {};


const fplist = {
    add: './sql/note/add.sql',
    update: './sql/note/update.sql'
};

Note.init = async function () {
    Note.sql = {};
    async function load(name, fp) {
        const str = await fs.readFile(fp, { encoding: 'utf8' });
        Note.sql[name] = str;
    }
    const promiseArr = [];
    for (const name in fplist) {
        const promise = load(name, fplist[name]);
        promiseArr.push(promise);
    }
    await Promise.all(promiseArr);
}

Note.add = async function (text, geo, time,) {
    geo = geo ? geo : null;
    time = time ? time : null;
    const sql = Note.sql['add'];
    await Note.client.query(sql, [geo, text, time, new Date()]);
}

module.exports = Note;
