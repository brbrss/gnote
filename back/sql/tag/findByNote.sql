SELECT projnote.tag.tag_name as tag_name FROM projnote.note_tag 
LEFT JOIN projnote.tag
ON
projnote.note_tag.tag_id=projnote.tag.my_id
AND
projnote.note_tag.note_id=$1
;
