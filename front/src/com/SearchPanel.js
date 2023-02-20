import React, { useState } from 'react';
import submit from '../util/submit';
import { NoteCard } from './NoteCard';


function SearchBar(props) {
    const state = props.state;
    const setState = props.setState;
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const mySubmit = async function (ev) {
        const res = await submit(ev);
        props.setRes(await res.json());
    }
    return (
        <form action="/api/search/" method="POST" onSubmit={mySubmit}>
            <label>
                Text
                <input type="text" name="content" onChange={handleInput} />
            </label>
            <button type="submit" >Submit</button>
        </form>
    );
}

function NoteList(props) {
    console.log(props.noteList);
    function F_(props) {
        return <NoteCard
            content={props.note.content}
            time={props.note.time}
            tagList={props.note.tagList}
            geoId={props.note.geoId}
            id={props.note.id}
        />
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
