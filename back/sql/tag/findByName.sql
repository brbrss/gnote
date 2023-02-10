SELECT  my_id, tag_name,tag_description FROM projnote.tag
WHERE tag_name = $1
;
