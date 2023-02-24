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

function TagSpan(props) {
    return (
        <span>
            {props.value.id + ' ' + props.value.name}
            <button onClick={() => props.cb(props.value.id)}>X</button>
            ,
        </span>
    );
}

function SelectedPanel(props) {
    return (
        <div>
            {props.list.map(t => <TagSpan key={t.id} value={t} cb={props.removeCb} />)}
        </div>
    );
}


function TagSearch(props) {
    const [text, setText] = useState('');
    const [get, cancel] = useMyFetch();
    const [candidateList, setcandidateList] = useState([]);

    function selecteTag(tag) {
        props.cb(tag);
        setText('');
        setcandidateList([]);
    }

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
            {candidateList.length ? <CandidateList cb={selecteTag} list={candidateList} /> : ''}
        </>
    );
}

/**
 * For selecting tag
 * @param {*} props
            */
function TagField(props) {
    //const [selected, setSelected] = useState([]); // list of tag obj, tag:{id,name,description,parent}
    const selected = props.selected;
    const setSelected = props.setSelected;
    function addTag(t) {
        if (selected.find(item => item.id === t.id)) {
            return;
        }
        setSelected(old => [...old, t]);
    }
    function removeTag(tid) {
        setSelected(
            old => old.filter(t => t.id !== tid)
        );
    }
    return (
        <div>
            <SelectedPanel list={selected} removeCb={removeTag} />
            <TagSearch cb={addTag} />
        </div>
    );
}


export { TagField };
