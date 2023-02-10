const loadSql = require('./loadSql');
const toNumber = require('../util/convert');


const Point = {};

const FPLIST = {
    add: './sql/point/add.sql',
    find: './sql/point/find.sql',
    all: './sql/point/all.sql',
};

Point.init = async function () {
    await loadSql(Point, FPLIST);
}


Point.add = async function (name, lon, lat, comment) {
    comment = comment ? comment : null;
    const res = await Point.client.query(Point.sql['add'], [name, lon, lat, comment]);
    return res.rows[0]['entity_id'];
}

Point.find = async function (id) {
    const res = await Point.client.query(Point.sql['find'], [id]);
    return res.rows[0];
}

Point.all = async function (offset, limit) {
    offset = toNumber(offset, 0);
    limit = toNumber(limit, 10);

    const res = await Point.client.query(Point.sql['all'], [offset, limit]);
    return res.rows;
}

module.exports = Point;
