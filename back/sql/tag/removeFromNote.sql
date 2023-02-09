DELETE FROM projnote.note_tag
WHERE note_id=$1 AND tag_id=$2; 
