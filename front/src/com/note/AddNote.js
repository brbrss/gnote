import React, { useState } from 'react';
//import submit from '../util/submit';
import { TagField } from '../tag/TagField';


function addTime(dateStr, timeStr) {
    if (!dateStr) {
        return '';
    }
    if (!timeStr) {
        return dateStr;
    }
    else {
        return dateStr + 'T' + timeStr;
    }
}

function AddNote(props) {
    const [state, setState] = useState({
        content: '',
        event_date: '',
        event_time: '',
        geo: ''
    });
    const [tagList, setTagList] = useState([]);
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    async function mySubmit(ev) {
        ev.preventDefault();
        let object = {
            content: state.content,
            time: addTime(state.event_date, state.event_time),
            geo: state.geo,
            tagList: tagList.map(t => t.id)
        };
        console.log(state);
        let json = JSON.stringify(object);
        console.log(json);
        const res = await fetch(ev.target.action, {
            method: ev.target.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        console.log(res);
    }
    return (
        <form action="/api/note/" method="POST" onSubmit={mySubmit}>
            Add New
            <label>
                Content
                <input type="text" name="content" value={state.content} required onChange={handleInput} />
            </label>
            <label>
                Date
                <input type="date" name="event_date" value={state.event_date} onChange={handleInput} />
            </label>
            <label>
                Time
                <input type="time" name="event_time" step={1} value={state.event_time} onChange={handleInput} />
            </label>
            <label>
                Location
                <input type="text" name="geo" value={state.geo} onChange={handleInput} />
            </label>

            <label>
                Tag
                <TagField selected={tagList} setSelected={setTagList} />
            </label>
            <button type="submit" >Submit</button>
        </form>
    );
}


export { AddNote };
