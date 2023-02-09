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
    const res = await this.client.query(this.sql['add'], [name, lon, lat, comment]);
    return res.rows[0]['entity_id'];
}

Tag.find = async function (name, description) {
    description = description ? description : null;
    const res = await this.client.query(this.sql['find'], [name, lon, lat, comment]);
    return res.rows[0]['entity_id'];
}

module.exports = Tag;
