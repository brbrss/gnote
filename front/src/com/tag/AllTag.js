import React, { useState, useEffect } from 'react';
import { useMyFetch } from '../../util/useMyFetch';


function TagRow(props) {
    const tag = props.tag;
    return (<div>
        <div>
            {tag.id}
        </div>
        <div>
            {tag.name}
        </div>
        <div>
            {tag.description}
        </div>
    </div>);
}

function AllTag(props) {
    const [get, cancel] = useMyFetch();
    const [data, setData] = useState([]);
    useEffect(() => {
        async function foo() {
            const res = await get('/api/tag/all');
            setData(await res.json());
        } 
        foo();
        return function () {
            cancel();
        };
    }, []);
    console.log(data);
    return (<div>
        {data.map(t => <TagRow tag={t} key={t.id} />)}
    </div>);
}

export { AllTag };
