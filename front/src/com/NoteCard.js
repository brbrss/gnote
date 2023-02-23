import React from 'react';

function TagRow(props) {
    const tlist = props.tagList;
    let f = function (str) {
        return <span key={str}>{str}</span>;
    }
    return tlist ? tlist.map(f) : null;
}

function NoteCard(props) {
    const time_added = props.time_added;
    const time_event = props.time_event;
    const content = props.content;
    const tagList = props.tagList;
    const geoId = props.geoId;
    const id = props.id;
    return (
        <div>
            <span>No. {id}</span> &nbsp; &nbsp;
            <span>Time added: <time>{(new Date(time_added)).toLocaleString()}</time></span> &nbsp;
            {time_event ? <span>Time event: <time>{(new Date(time_event)).toLocaleString()}</time></span> : null} &nbsp;
            <span>{geoId === null ? 'No location' : 'Location ID: ' + geoId}</span>
            <div>{content}</div>
            <TagRow tagList={tagList}></TagRow>
        </div>
    );
}


export { NoteCard };
