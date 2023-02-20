import React from 'react';

function TagRow(props) {
    const tlist = props.tagList;
    let f = function (str) {
        return <span>{str}</span>;
    }
    return tlist ? tlist.map(f) : null;
}

function NoteCard(props) {
    const time = props.time;
    const content = props.content;
    const tagList = props.tagList;
    const geoId = props.geoId;
    const id = props.id;
    return (
        <div>
            <span>No. {id}</span>
            {time ? <span>Time added: <time>{String(time)}</time></span> : null}
            <div>{content}</div>
            <TagRow tagList={tagList}></TagRow>
        </div>
    );
}


export { NoteCard };
