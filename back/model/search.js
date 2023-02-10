const Dollar = require('../util/dollar');

const Search = {};

/**
 * Creates query, search conditions appear in param. These keys can appear in param:
 * 
 * text: string to be searched
 * 
 * tag: tag id of note
 * 
 * @param {object} param - search condition 
 * @returns 
 */
Search.createSql = function (param) {
    // no injection, input values only occur as query parameters

    const d = new Dollar();
    const ENDL = '\n';
    let sql = 'SELECT * from projnote.note' + ENDL
        + 'WHERE 1=1' + ENDL;
    const queryParam = [];
    // text
    if (param.text) {
        sql += "AND mycontent LIKE '%' ||" + d.call() + "||'%' " + ENDL;
        queryParam.push(param.text);
    }
    // tag
    if (param.tag) {
        sql +=
            `AND myid in (SELECT note_id 
                FROM projnote.note_expand_tag
                WHERE projnote.note_expand_tag.tag_id=`
            + d.call() + ')' + ENDL;
        queryParam.push(param.tag);
    }
    sql += ' ORDER BY myid;';
    const query = {
        text: sql,
        values: queryParam,
    }
    return query;
}

Search.search = async function (param) {
    const query = this.createSql(param);
    const res = await this.client.query(query);
    return res.rows;
}

module.exports = Search;

