CREATE TABLE IF NOT EXISTS projnote.tag
(
    my_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    tag_name varchar(64) NOT NULL,
    tag_description text COLLATE pg_catalog."default",
    CONSTRAINT tag_pkey PRIMARY KEY (my_id)
);

CREATE TABLE IF NOT EXISTS projnote.note_tag
(
    my_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    note_id integer,
    tag_id integer,
    CONSTRAINT FK_note FOREIGN KEY (note_id)
        REFERENCES projnote.note (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT FK_tag FOREIGN KEY (tag_id)
        REFERENCES projnote.tag (my_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION    
);

