const loadSql = require('./loadSql');
const toNumber = require('../util/convert');
const { NotFoundError, DbConnectionError } = require('./modelError');

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
    let res;
    try {
        res = await Point.client.query(Point.sql['find'], [id]);
    } catch (err) {
        throw new DbConnectionError();
    }
    const point = res.rows[0];
    if (point) {
        return Point.fromRow(point);
    } else {
        throw new NotFoundError('Point ID');
    }
}

Point.all = async function (offset, limit) {
    offset = toNumber(offset, 0);
    limit = toNumber(limit, 10);

    const res = await Point.client.query(Point.sql['all'], [offset, limit]);
    return res.rows.map(r => Point.fromRow(r));
}

Point.fromRow = function (row) {
    return {
        id: row.myid,
        name: row.myname,
        desc: row.textcontent,
        shape: row.shape
    };
}

module.exports = Point;
