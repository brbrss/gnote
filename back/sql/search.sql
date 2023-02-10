SELECT * from projnote.note
WHERE 1=1
    AND ($1::text IS NULL OR mycontent LIKE '%' || $1::text ||'%' )
    AND ($2::integer IS NULL OR myid IN 
            (SELECT note_id 
            FROM projnote.note_expand_tag
            WHERE projnote.note_expand_tag.tag_id=$2::integer
            )
        )
ORDER BY myid
;
