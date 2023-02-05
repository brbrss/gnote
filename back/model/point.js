

const Point = {};

Point.add = async function (name, lon, lat, comment) {
    const sql = `
    WITH A AS
    (
        INSERT INTO projnote.geo_entity (myname,mytype,textcontent) 
        VALUES ($1,0,$4) RETURNING myid
    )

    INSERT INTO projnote.geo_point (entity_id,shape) 
    SELECT myid,projnote.ST_Point($2,$3,4326)
    FROM A 
    RETURNING entity_id
    ;
    `;
    comment = comment ? comment : null;
    const res = await Point.client.query(sql, [name, lon, lat, comment]);
    return res.rows[0]['entity_id'];
}

Point.find = async function (id) {
    const sql = `
        SELECT 
            projnote.geo_entity.myid AS myid,
            projnote.geo_entity.myname AS myname,
            projnote.geo_entity.textcontent AS textcontent,
            projnote.geo_point.shape AS shape
        FROM projnote.geo_entity 
        LEFT JOIN projnote.geo_point
        on projnote.geo_entity.myid=projnote.geo_point.entity_id
        where projnote.geo_entity.myid=$1
        ;
    `;
    const res = await Point.client.query(sql, [id]);
    return res.rows[0];
}

Point.all = async function () {
    const sql = `
        SELECT 
            projnote.geo_entity.myid AS myid,
            projnote.geo_entity.myname AS myname,
            projnote.geo_entity.textcontent AS textcontent,
            projnote.geo_point.shape AS shape
        FROM projnote.geo_entity 
        LEFT JOIN projnote.geo_point
        on projnote.geo_entity.myid=projnote.geo_point.entity_id
        ;
    `;
    const res = await Point.client.query(sql);
    return res.rows;
}

module.exports = Point;
