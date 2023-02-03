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
