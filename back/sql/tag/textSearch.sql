
SELECT  my_id, tag_name,tag_description,parent_tag FROM projnote.tag
where
	LOWER(tag_name) like  '%' || LOWER($1)  || '%'
	or LOWER(tag_description) like  '%' ||  LOWER($1) || '%'
order by 
	case 
		when LOWER(tag_name) like   LOWER($1) || '%' then 'a'
		when LOWER(tag_name) like  '%' || LOWER($1) || '%' then 'b'
		when LOWER(tag_description) like  '%' || LOWER($1) || '%' then 'c'
		else 'n'
  	END,
    tag_name
limit $2

;
