--- note
CREATE TABLE IF NOT EXISTS projnote.note
(
    myid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    geo integer,
    time_event timestamp without time zone,
    mycontent text COLLATE pg_catalog."default",
    time_added timestamp without time zone,
    CONSTRAINT note_pkey PRIMARY KEY (myid),
    CONSTRAINT FK_geo_in_note FOREIGN KEY (geo)
        REFERENCES projnote.geo_entity (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
