const loadSql = require('./loadSql');


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
        param.tag // $2
    ];
    const res = await this.client.query(this.sql['search'], arr);
    return res.rows;
}

module.exports = Search;

