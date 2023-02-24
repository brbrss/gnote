import React, { useState } from 'react';
import { TagField } from './TagField';

function AddTag(props) {
    const [state, setState] = useState({
        name: '',
        description: ''
    });
    const [tagList, setTagList] = useState([]);
    const [suc, setSuc] = useState(false);
    const [errStatus, setErrStatus] = useState(null);

    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
        setSuc(false);
    }
    async function submit(ev) {
        setSuc(false);
        ev.preventDefault();
        if (tagList.length > 1) {
            setErrStatus('too many parents: ');
            return;
        }
        let data = { ...state, parent: '' };
        if (tagList.length === 1) {
            const parent = tagList[0].id;
            data = { ...data, parent: parent };
        }
        let json = JSON.stringify(data);
        const res = await fetch(ev.target.action, {
            method: ev.target.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        if (res.status === 201) {
            setSuc(true);
            setState({ name: '', description: '' });
            setTagList([]);
            setErrStatus(null);
        } else {
            setErrStatus(res.status);
        }
    }
    return (
        <form action="/api/tag/" method="POST" onSubmit={submit}>
            {suc ? <div>Entry added</div> : ''}
            {errStatus ? <div>Error {errStatus}</div> : ''}
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
                <TagField selected={tagList} setSelected={setTagList} />
            </label>
            <button type="submit" >Submit</button>
        </form>
    );
}


export { AddTag };
