-- load extension
CREATE EXTENSION  IF NOT EXISTS  postgis;

-- table creation

--- geo_entity
CREATE TABLE IF NOT EXISTS foo.geo_entity
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    myname character varying(64) COLLATE pg_catalog."default",
    mytype integer,
    CONSTRAINT geo_entity_pkey PRIMARY KEY (id),
    CONSTRAINT geo_entity_type_check CHECK (type = ANY (ARRAY[0, 1])) NOT VALID
);

COMMENT ON COLUMN foo.geo_entity.mytype
    IS 'values: 0-city; 1-state/province; 2-country';

--- city
CREATE TABLE IF NOT EXISTS foo.city
(
    id integer NOT NULL,
    shape foo.geography(Point,4326),
    CONSTRAINT city_pkey PRIMARY KEY (id),
    CONSTRAINT id FOREIGN KEY (id)
        REFERENCES foo.geo_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

--- note
CREATE TABLE IF NOT EXISTS foo.note
(
    myid integer NOT NULL,
    geo integer,
    time_event timestamp without time zone,
    mycontent text COLLATE pg_catalog."default",
    time_added timestamp without time zone,
    CONSTRAINT note_pkey PRIMARY KEY (myid),
    CONSTRAINT "FK_geo" FOREIGN KEY (geo)
        REFERENCES foo.geo_entity (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
