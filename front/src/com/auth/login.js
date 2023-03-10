import React, { useState, useContext } from 'react';
import submit from '../../util/submit';
import { UserContext } from '../../context/UserContext';


function Login(props) {
    const ctx = useContext(UserContext);

    const [state, setState] = useState({ username: '', password: '' });
    const [err, setErr] = useState(null);
    function handleInput(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    async function mySubmit(ev) {
        try {
            const userData = await submit(ev);
            ctx.setUser(await userData.json());
        } catch (er) {
            setErr(er);
        }
    }
    return (
        <form action="/api/auth/login" method="POST" onSubmit={mySubmit}>
            Log In
            {err ? <div>{err}</div> : null}
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
            <button type="submit">Login</button>
        </form>
    );
}




export { Login };
