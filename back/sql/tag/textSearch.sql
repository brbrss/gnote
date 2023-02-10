
SELECT  tag_name,tag_description FROM projnote.tag
where
	tag_name like  '%' || $1 || '%'
	or tag_description like  '%' || $1 || '%'
order by 
	case 
		when tag_name like   $1 || '%' then 'a'
		when tag_name like  '%' || $1 || '%' then 'b'
		when tag_description like  '%' || $1 || '%' then 'c'
		else 'n'
  	END,
    tag_name
limit $2

;
