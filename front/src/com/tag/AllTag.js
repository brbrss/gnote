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
            try {
                const res = await get('/api/tag/all');
                setData(await res.json());
            } catch (err) {
            }
        }
        foo();
        return function () {
            cancel();
        };
    }, []);
    return (<div>
        {data.map(t => <TagRow tag={t} key={t.id} />)}
    </div>);
}

export { AllTag };
