--- geo_point
CREATE TABLE IF NOT EXISTS projnote.geo_point
(
    entity_id integer NOT NULL,
    shape public.geography(Point,4326),
    CONSTRAINT geo_point_pkey PRIMARY KEY (entity_id),
    CONSTRAINT FK_id FOREIGN KEY (entity_id)
        REFERENCES projnote.geo_entity (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
