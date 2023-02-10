UPDATE projnote.tag
SET tag_name=$2, tag_description=$3, parent_tag=$4
WHERE my_id=$1; 
