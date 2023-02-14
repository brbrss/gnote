CREATE TABLE projnote.auth
(
    user_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    username text NOT NULL,
    salt text NOT NULL,
    hashed_pw text NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE (username)
);
