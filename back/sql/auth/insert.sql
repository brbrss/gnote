INSERT INTO projnote.auth
(username, salt, hashed_pw)
VALUES
($1, $2, $3)
RETURNING user_id
;