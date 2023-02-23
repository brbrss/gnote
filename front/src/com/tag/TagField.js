import React, { useState } from 'react';
import { useMyFetch } from '../../util/useMyFetch';

function Row(props) {
    return (
        <button onClick={() => props.cb(props.value)}>
            {props.text}
        </button>
    );
}

function CandidateList(props) {
    return (
        <div>
            {props.list.map((t, i) => <Row cb={props.cb} key={t.id} text={t.name} value={t} />)}
        </div >
    );
}


/**
 * For selecting tag
 * @param {*} props
            */
function TagField(props) {
    const [text, setText] = useState('');
    const [value, setValue] = useState(null);
    const [get, cancel] = useMyFetch();
    const [candidateList, setcandidateList] = useState([]);
    async function typeKey(ev) {
        cancel();
        const t = ev.target.value.trim();
        setText(t);
        if (t === '') {
            setcandidateList([]);
            return;
        }
        const res = await get('/api/tag/search/' + t, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status !== 200) {
            console.log('res status', res.status);
            console.log(res);
        }
        setcandidateList(await res.json());
    }

    return (
        <>
            <input type="text" value={text} onChange={(typeKey)}></input>
            {candidateList.length ? <CandidateList cb={setValue} list={candidateList} /> : ''}
        </>
    );
}


export { TagField };
