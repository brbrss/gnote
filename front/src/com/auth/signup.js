import React, { useState } from 'react';
import submit from '../../util/submit';



function Signup(props) {
    const [state, setState] = useState({ username: '', password: '' });
    const [err, setErr] = useState(null);
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    async function mySubmit(ev) {
        try {
            const resData = await submit(ev);
            if (resData.status !== 201) {
                setErr('Err status '+resData.status);
                return;
            }
            const data = await resData.json();
            props.setSuc(data.success);
            console.log(data);
        } catch (er) {
            setErr(er);
        }
    }
    return (
        <form action="/api/auth/signup" method="POST" onSubmit={mySubmit}>
            Sign Up
            {err ? <div>{String(err)}</div> : null}
            <label>
                User Name
                <input type="text" name="username"
                    value={state.username}
                    onChange={handleInput}
                    required></input>
            </label>
            <label>
                Password
                <input type="password" name="password"
                    value={state.password}
                    onChange={handleInput}
                    required></input>
            </label>
            <button type="submit">Signup</button>
        </form>
    );
}




export { Signup };
