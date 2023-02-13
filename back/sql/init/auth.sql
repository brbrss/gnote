CREATE TABLE projnote.auth
(
    user_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    username text NOT NULL,
    salt text NOT NULL,
    hashed_pw text NOT NULL,
    session_valid_until timestamp without time zone NOT NULL,
    session_token text,
    PRIMARY KEY (user_id),
    UNIQUE (username)
);
