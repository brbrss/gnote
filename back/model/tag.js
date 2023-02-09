const loadSql = require('./loadSql');



const Tag = {};

const fplist = {
    add: './sql/tag/add.sql',
    update: './sql/tag/update.sql',
    delete: './sql/tag/delete.sql',
    find: './sql/tag/find.sql'
};

Tag.init = async function () {
    await loadSql(Tag, fplist);
}

Tag.add = async function (name, description) {
    description = description ? description : null;
    const res = await this.client.query(this.sql['add'], [name, description]);
    return res.rows[0]['my_id'];
}

Tag.find = async function (id) {
    const res = await this.client.query(this.sql['find'], [id]);
    const entry = res.rows[0];
    return { id: entry.my_id, name: entry.tag_name, description: entry.tag_description };
}

Tag.delete = async function (id) {
    const res = await this.client.query(this.sql['delete'], [id]);
    return res.rowCount;
}

Tag.update = async function (id, name, description) {
    description = description ? description : null;
    const res = await this.client.query(this.sql['update'], [id, name, description]);
    return res.rowCount;
}

module.exports = Tag;
