const loadSql = require('./loadSql');



const Tag = {};

const fplist = {
    add: './sql/tag/add.sql',
    update: './sql/tag/update.sql',
    delete: './sql/tag/delete.sql',
    find: './sql/tag/find.sql',
    findByName: './sql/tag/findByName.sql',
    findByNote: './sql/tag/findByNote.sql',
    addToNote: './sql/tag/addToNote.sql',
    removeFromNote: './sql/tag/removeFromNote.sql',
    textSearch: './sql/tag/textSearch.sql'
};

Tag.init = async function () {
    await loadSql(Tag, fplist);
}

/**
 * 
 * @param {String} name 
 * @param {String} description 
 * @param {} parent_id 
 * @returns id of inserted tag
 */
Tag.add = async function (name, description, parent_id) {
    description = description ? description : null;
    parent_id = parent_id ? parent_id : null;
    const res = await this.client.query(this.sql['add'], [name, description, parent_id]);
    return res.rows[0]['my_id'];
}

Tag.find = async function (id) {
    const res = await this.client.query(this.sql['find'], [id]);
    const entry = res.rows[0];
    return { id: entry.my_id, name: entry.tag_name, description: entry.tag_description };
}

Tag.findByName = async function (name) {
    const res = await this.client.query(this.sql['findByName'], [name]);
    const entry = res.rows[0];
    return { id: entry.my_id, name: entry.tag_name, description: entry.tag_description };
}

Tag.delete = async function (id) {
    const res = await this.client.query(this.sql['delete'], [id]);
    return res.rowCount;
}

Tag.update = async function (id, name, description, parent_id) {
    description = description ? description : null;
    parent_id = parent_id ? parent_id : null;
    const res = await this.client.query(this.sql['update'], [id, name, description, parent_id]);
    return res.rowCount;
}

Tag.removeFromNote = async function (noteId, tagId) {
    const res = await this.client.query(this.sql['removeFromNote'], [noteId, tagId]);
    return res.rowCount;
}

Tag.addToNote = async function (noteId, tagId) {
    const res = await this.client.query(this.sql['addToNote'], [noteId, tagId]);
    return res.rowCount;
}

Tag.findByNote = async function (noteId) {
    const res = await this.client.query(this.sql['findByNote'], [noteId]);
    //return res.rows.map(obj=>obj.tag_name);
    return res.rows;
}

Tag.textSearch = async function (str, limit) {
    const res = await this.client.query(this.sql['textSearch'], [str, limit]);
    return res.rows
}

module.exports = Tag;
