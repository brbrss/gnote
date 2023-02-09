const loadSql = require('./loadSql');



const Note = {};


const fplist = {
    add: './sql/note/add.sql',
    update: './sql/note/update.sql',
    delete: './sql/note/delete.sql',
    find: './sql/note/find.sql'
};



Note.init = async function () {
    await loadSql(Note, fplist);
}

Note.add = async function (text, geo, time) {
    geo = geo ? geo : null;
    time = time ? time : null;
    const sql = Note.sql['add'];
    const res = await Note.client.query(sql, [geo, text, time]);
    return res.rows[0]['myid'];
}

Note.update = async function (id, text, geo, time) {
    geo = geo ? geo : null;
    time = time ? time : null;
    const sql = Note.sql['update'];
    const res = await Note.client.query(sql, [id, geo, text, time]);
    return res.rowCount;
}

Note.remove = async function (id) {
    const sql = Note.sql['delete'];
    const res = await Note.client.query(sql, [id]);
    return res.rowCount;
}

Note.find = async function (fid) {
    const sql = Note.sql['find'];
    const res = await Note.client.query(sql, [id]);
    return res.rowCount;
}

module.exports = Note;