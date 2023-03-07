 SELECT 
    projnote.geo_entity.myid AS myid,
    projnote.geo_entity.myname AS myname,
    projnote.geo_entity.textcontent AS textcontent,
    public.ST_AsGeoJSON(projnote.geo_point.shape) AS shape
FROM projnote.geo_entity 
LEFT JOIN projnote.geo_point
on projnote.geo_entity.myid=projnote.geo_point.entity_id
ORDER BY myid
LIMIT $2 OFFSET $1
;