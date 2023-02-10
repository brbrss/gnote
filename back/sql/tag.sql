CREATE TABLE IF NOT EXISTS projnote.tag
(
    my_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    tag_name varchar(64) NOT NULL,
    tag_description text COLLATE pg_catalog."default",
    parent_tag integer,
    CONSTRAINT tag_pkey PRIMARY KEY (my_id),
    CONSTRAINT FK_parent_key FOREIGN KEY (parent_tag) 
        REFERENCES projnote.tag (my_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projnote.note_tag
(
    my_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    note_id integer,
    tag_id integer,
    CONSTRAINT FK_note FOREIGN KEY (note_id)
        REFERENCES projnote.note (myid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT FK_tag FOREIGN KEY (tag_id)
        REFERENCES projnote.tag (my_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT unique_pair UNIQUE (note_id, tag_id)
);

CREATE VIEW projnote.tag_ancestor
 AS
WITH RECURSIVE mmt(tid,pid) AS (
    SELECT my_id AS tid, parent_tag AS pid FROM projnote.tag
	WHERE projnote.tag.parent_tag IS NOT NULL
  UNION ALL
    SELECT projnote.tag.my_id AS tid, mmt.pid AS pid
		FROM projnote.tag JOIN mmt
			ON mmt.tid=projnote.tag.parent_tag
	
)
SELECT tid AS tag_id, pid AS ancestor_id FROM mmt
ORDER BY tid, pid;
