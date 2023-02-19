import React, { useState } from 'react';



function AddNote(props) {
    const [state, setState] = useState('');
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    async function submit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object);
        await fetch(ev.target.action, {
            method: ev.target.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
    }
    return (
        <form action="/api/note/" method="POST" onSubmit={submit}>
            <label>
                Content
                <input type="text" name="content" onChange={handleInput} />
            </label>
            <label>
                Datetime
                <input type="datetime-local" name="event_date" onChange={handleInput} />
            </label>
            {/* <label>
                Time
                <input type="time" name="event_time" onChange={handleInput} />
            </label> */}
            <label>Location
                <button type="submit" >Submit</button>
            </label>
        </form>
    );
}


export { AddNote };
