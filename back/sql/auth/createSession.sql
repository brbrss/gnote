UPDATE projnote.auth
SET session_valid_until = NOW() + interval '1 second' * $2,
    session_token = $3
WHERE user_id=$1
RETURNING session_token
;