INSERT INTO projnote.note
(geo_id, mycontent, time_event,  time_added)
VALUES ($1, $2,$3,NOW())
RETURNING myid
;
