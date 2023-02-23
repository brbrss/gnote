import React, { useState } from 'react';
import { TagField } from './TagField';

function AddTag(props) {
    const [state, setState] = useState({
        name: '',
        description: '',
        parent: ''
    });
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    async function submit(ev) {
        ev.preventDefault();
        let json = JSON.stringify(state);
        const res = await fetch(ev.target.action, {
            method: ev.target.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        props.cb(res);
    }
    return (
        <form action="/api/tag/" method="POST" onSubmit={submit}>
            Add New
            <label>
                Name
                <input type="text" name="name" value={state.name} required onChange={handleInput} />
            </label>
            <label>
                Description
                <input type="text" name="description" value={state.description} onChange={handleInput} />
            </label>
            <label>
                Parent Tag
                <input type="text" name="parent" hidden value={state.event_time} onChange={handleInput} />
                <TagField />
            </label>
            <button type="submit" >Submit</button>
        </form>
    );
}


export { AddTag };
