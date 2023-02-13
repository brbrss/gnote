INSERT INTO projnote.auth
(username, salt, hashed_pw,session_valid_until)
VALUES
($1, $2, $3, NOW())
RETURNING user_id
;