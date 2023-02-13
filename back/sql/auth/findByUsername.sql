SELECT user_id, username, salt, hashed_pw FROM projnote.auth
WHERE username=$1;
 