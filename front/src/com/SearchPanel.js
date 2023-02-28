import React, { useState } from 'react';
import submit from '../util/submit';
import { NoteList } from './note/NoteList';
import { TagField } from './tag/TagField';
import { useMyFetch } from '../util/useMyFetch';
import { ShowCircle } from './ShowCircle';


function SearchBar(props) {
    const [state, setState] = useState({ text: '', timeStart: '', timeEnd: '', lat: '', lon: '', radius: '' });
    const [tagList, setTagList] = useState([]);
    const [err, setErr] = useState(null);

    function handleInput(e) {
        setState(old => ({ ...old, [e.target.name]: e.target.value }))
    }
    function resetValue(name) {
        setState(old => ({ ...old, [name]: '' }));
    }
    function setLatlon(latlon) {
        setState(old => ({ ...old, lat: latlon[0], lon: latlon[1] }));
    }
    const [get, cancel] = useMyFetch();
    const mySubmit = async function (ev) {
        try {
            ev.preventDefault();
            let json = JSON.stringify({ ...state, tagId: tagList.map(obj => obj.id) });
            const res = await get(ev.target.action, {
                method: ev.target.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            });
            if (res.status !== 200) {
                setErr(res.status);
                return;
            }
            props.setRes(await res.json());
            setErr(null);
        } catch (e) {
            setErr(e);
            cancel();
        }
    }
    return (
        <form action="/api/search/" method="POST" onSubmit={mySubmit}>
            {err ? 'error' + err : ''}<br />
            <label>
                Text
                <input type="text" name="text" onChange={handleInput} />
            </label><br />
            <label>
                Tag
                <TagField selected={tagList} setSelected={setTagList} />
            </label><br />
            <label>
                Time From:
                <input type="date" name="timeStart" value={state.timeStart} onChange={handleInput} />
                <button type="button" onClick={() => resetValue('timeStart')}>X</button>
            </label><br />
            <label>
                Time To:
                <input type="date" name="timeEnd" value={state.timeEnd} onChange={handleInput} />
                <button type="button" onClick={() => resetValue('timeEnd')}>X</button>
            </label><br />
            <fieldset>
                <label>
                    Center (lat,lon)
                    <input type="number" name="lat" value={state.lat} onChange={handleInput} />
                    <input type="number" name="lon" value={state.lon} onChange={handleInput} />
                </label>
                <label>Radius (m)
                    <input type="number" name="radius" value={state.radius} onChange={handleInput} />
                </label>
                <button type="button"
                    onClick={() => { resetValue('lat'); resetValue('lon'); resetValue('radius') }} >
                    Clear</button>
            </fieldset>
            <ShowCircle latlon={[state.lat, state.lon]} radius={state.radius} setLatlon={setLatlon} />
            <button type="submit" >Search</button>
        </form>
    );
}



function SearchPanel(props) {
    const [noteList, setNoteList] = useState([]);

    return (
        <div>
            <SearchBar setRes={setNoteList} />
            <NoteList noteList={noteList} />
        </div>
    );
}

export { SearchPanel };
