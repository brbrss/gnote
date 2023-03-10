import React, { useState, useContext } from 'react';

import { UserContext } from '../../context/UserContext';
import { Login } from './login';
import { Signup } from './signup';
import submit from "../../util/submit";

function ShowUser(props) {
    const ctx = useContext(UserContext);

    async function mySubmit(ev) {
        ev.preventDefault();
        await submit(ev);
        ctx.setUser(null);
    }
    return (
        <div>
            <form action="/api/auth/logout" method="POSt" onSubmit={mySubmit}>
                {props.user.id}
                <button >Logout</button>
            </form>
        </div>
    );
}

function ShowEnter(props) {
    const [page, setPage] = useState(true);
    const [signupSuc, setSignupSuc] = useState(false);
    function signupCb(x) { // for "redirecting" to login
        setSignupSuc(x);
        if (x) {
            setPage(true);
        }
    }
    return (
        <>
            {signupSuc ? 'Account created. Login below.' : ''}
            {
                page
                    ? <button onClick={() => setPage(false)}>Goto Signup</button>
                    : <button onClick={() => setPage(true)}>Goto Login</button>
            }

            {page ? <Login /> : <Signup setSuc={signupCb} />}
        </>
    );
}

function User(props) {
    const ctx = useContext(UserContext);

    const user = ctx.user;
    console.log(user);

    return (
        <div>


            {user ? <ShowUser user={user} /> : <ShowEnter />}

        </div>
    );
}




export { User };
