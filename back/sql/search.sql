----
-- search by text
-- $1 text - substring in content
----
-- search by tag
-- $2 integer[] - tag id array
---- 
-- search note within circle
-- $3 float longitude of center
-- $4 float latittude of center
-- $5 float - radius of circle
----


SELECT * from projnote.note
WHERE 1=1
    AND ($1::text IS NULL OR LOWER(mycontent) LIKE '%' || LOWER($1::text) ||'%' )
    AND ($2::int[] IS NULL OR 
             (
                $2::int[] <@
                    (SELECT ARRAY(
                        SELECT  tag_id
                        FROM projnote.note_expand_tag 
                        WHERE projnote.note_expand_tag.note_id=projnote.note.myid
                    ))
            )
        )
    AND ($3::float IS NULL OR $4::float IS NULL OR $5::float IS NULL OR
        public.ST_DWithin(
            public.ST_SetSRID(public.ST_MakePoint($3::float,$4::float), 4326),
             (SELECT projnote.geo_point.shape 
			 FROM  projnote.geo_point where projnote.note.geo_id=projnote.geo_point.entity_id )
            ,$5::float)
        )
     AND ($6::timestamp IS NULL OR $6 <= projnote.note.time_event)
     AND ($7::timestamp IS NULL OR $7 >= projnote.note.time_event)

ORDER BY myid
;
