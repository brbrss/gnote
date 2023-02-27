import React from 'react';
import { NoteCard } from './NoteCard';
import { Link } from 'react-router-dom';



function NoteList(props) {
    function F_(props) {
        return (
            <div>
                <NoteCard
                    content={props.note.content}
                    time_added={props.note.time_added}
                    time_event={props.note.time_event}
                    tagList={props.note.tagList}
                    geoId={props.note.geo_id}
                    id={props.note.id}
                />
                <Link to={'/note/view/' + props.note.id}>Details</Link>
            </div >
        );
    }
    return (
        <div>
            {props.noteList.map(
                (item, i) => <F_ note={item} key={item.id} />)}
        </div>
    );
}


export { NoteList };
