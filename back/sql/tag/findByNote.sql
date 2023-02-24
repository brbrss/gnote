SELECT 
    projnote.tag.my_id AS my_id,
    projnote.tag.tag_name AS tag_name,
    projnote.tag.tag_description AS tag_description,
    projnote.tag.parent_tag AS parent_tag
FROM projnote.note_tag 
LEFT JOIN projnote.tag
ON
    projnote.note_tag.tag_id=projnote.tag.my_id
    AND
    projnote.note_tag.note_id=$1
;
