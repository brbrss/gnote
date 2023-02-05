INSERT INTO projnote.note
(geo, time_event, mycontent, time_added)
VALUES ($1, $2,$3,$4)
RETURNING myid
;
