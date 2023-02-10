INSERT INTO projnote.tag
(tag_name, tag_description, parent_tag)
VALUES
($1, $2, $3)
RETURNING my_id
;