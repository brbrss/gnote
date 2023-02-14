const loadSql = require('./loadSql');
const Note = require('./note');


const Search = {};

const fplist = {
    search: './sql/search.sql'
};

Search.init = async function () {
    await loadSql(Search, fplist);
}


Search.search = async function (param) {
    const arr = [
        param.text ? param.text : null, // $1
        param.tag, // $2
        param?.wdist?.x, // $3
        param?.wdist?.y, // $4
        param?.wdist?.dist // $5
    ];
    const res = await this.client.query(this.sql['search'], arr);
    return res.rows.map(r => Note.fromRow(r));
}

module.exports = Search;

