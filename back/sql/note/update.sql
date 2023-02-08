UPDATE projnote.note
SET geo_id=$2, mycontent=$3, time_event=$4, time_added=NOW()
WHERE myid=$1; 
