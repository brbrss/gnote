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
    