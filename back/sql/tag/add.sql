INSERT INTO projnote.tag
(tag_name, tag_description)
VALUES
($1, $2)
RETURNING my_id
;