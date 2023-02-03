--- geo_point
CREATE TABLE IF NOT EXISTS projnote.geo_point
(
    myid integer NOT NULL,
    shape projnote.geography(Point,4326),
    CONSTRAINT geo_point_pkey PRIMARY KEY (myid),
    CONSTRAINT FK_myid FOREIGN KEY (myid)
        REFERENCES projnote.geo_entity (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
