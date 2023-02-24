import React, { useEffect, useState } from 'react';
import { NoteCard } from './NoteCard';
import { useMyFetch } from '../../util/useMyFetch';
import { useParams } from 'react-router-dom';

function ShowTags(props) {
    return (<div>Tags:
        {props.list.map(obj => <span key={obj.id}>{obj.name}, </span>)}
    </div>);
}

function ViewNote(props) {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [tags, setTags] = useState([]);
    const [get, cancel] = useMyFetch();
    useEffect(() => {
        async function f() {
            try {
                const res1 = await get('/api/note/' + id);
                setNote(await res1.json());
                const res2 = await get('/api/tag/note/' + id);
                setTags(await res2.json());
            } catch (err) {
            }
        }
        f();
        return () => cancel();
    }, []
    );
    return (
        <div>
            <NoteCard
                content={note?.content}
                time_added={note?.time_added}
                time_event={note?.time_event}
                tagList={note?.tagList}
                geoId={note?.geo_id}
                id={note?.id}
            />
            <ShowTags list={tags} />
        </div>
    );
}


export { ViewNote };
