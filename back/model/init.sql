CREATE SCHEMA projnote;

-- load extension
CREATE EXTENSION  IF NOT EXISTS  postgis schema projnote;

-- table creation

--- geo_entity
CREATE TABLE IF NOT EXISTS projnote.geo_entity
(
    myid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    myname character varying(64) COLLATE pg_catalog."default",
    mytype integer,
    CONSTRAINT geo_entity_pkey PRIMARY KEY (myid),
    CONSTRAINT geo_entity_type_check CHECK (mytype = ANY (ARRAY[0, 1])) NOT VALID
);

COMMENT ON COLUMN projnote.geo_entity.mytype
    IS 'values: 0-city; 1-state/province; 2-country';

--- city
CREATE TABLE IF NOT EXISTS projnote.city
(
    myid integer NOT NULL,
    shape projnote.geography(Point,4326),
    CONSTRAINT city_pkey PRIMARY KEY (myid),
    CONSTRAINT FK_myid FOREIGN KEY (myid)
        REFERENCES projnote.geo_entity (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

--- note
CREATE TABLE IF NOT EXISTS projnote.note
(
    myid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    geo integer,
    time_event timestamp without time zone,
    mycontent text COLLATE pg_catalog."default",
    time_added timestamp without time zone,
    CONSTRAINT note_pkey PRIMARY KEY (myid),
    CONSTRAINT "FK_geo" FOREIGN KEY (geo)
        REFERENCES projnote.geo_entity (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
