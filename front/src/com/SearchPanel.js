import React, { useState } from 'react';
import submit from '../util/submit';
import { NoteCard } from './note/NoteCard';
import { Link } from "react-router-dom";


function SearchBar(props) {
    const state = props.state;
    const setState = props.setState;
    const [err, setErr] = useState(null);
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const mySubmit = async function (ev) {
        try {
            const res = await submit(ev);
            props.setRes(await res.json());
            setErr(null);
        } catch (e) {
            setErr(e);
        }
    }
    return (
        <form action="/api/search/" method="POST" onSubmit={mySubmit}>
            {err ? 'error' + err : ''}<br />
            <label>
                Text
                <input type="text" name="text" onChange={handleInput} />
            </label>
            <button type="submit" >Submit</button>
        </form>
    );
}

function NoteList(props) {
    console.log(props.noteList);
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

function SearchPanel(props) {
    const [searchParam, setSearchParam] = useState('');
    const [noteList, setNoteList] = useState([]);

    return (
        <div>
            <SearchBar state={searchParam} setState={setSearchParam} setRes={setNoteList} />
            <NoteList noteList={noteList} />
        </div>
    );
}

export { SearchPanel };
