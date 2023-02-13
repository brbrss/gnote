SELECT user_id, session_valid_until, session_token FROM projnote.auth
WHERE user_id=$1 
;
 