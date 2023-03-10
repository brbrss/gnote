import React, { useState, useEffect } from 'react';
import { SearchPanel } from "./SearchPanel";
import { AddNote } from './note/AddNote';
import { AddTag } from './tag/AddTag';
import { AllTag } from './tag/AllTag';
import { Routes, Route, useParams } from "react-router-dom";
import { ViewNote } from './note/ViewNote';
import { Link } from "react-router-dom";
import { AddPoint } from './point/Addpoint';
import { User } from './auth/user';
import { UserContext } from '../context/UserContext';
import { useMyFetch } from '../util/useMyFetch';


function Nav(props) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tag">Tag List</Link>
            <Link to="/addtag">Add Tag</Link>
            <Link to="/search">Search</Link>
            <Link to="/addNote">Add Note</Link>
            <Link to="/point/add">Add Point</Link>
        </nav>
    );
}


function FrontPage() {
    const [user, setUser] = useState(null);
    const ctxValue = { user, setUser };
    const [get, cancel] = useMyFetch();
    useEffect(() => {
        async function foo() {
            let res = null;
            try {
                res = await get('/api/auth');
                setUser(await res.json());
            } catch (er) {
                console.log(res);
            }
        }
        foo();
        return () => {
            cancel();
        };
    }, []);

    return (
        <div>
            Front Page
            <Nav />

            <UserContext.Provider value={ctxValue}>

                <Routes>
                    <Route path="/" element={<User />} />
                    <Route path="/tag" element={<AllTag />} />
                    <Route path="/addtag" element={<AddTag />} />

                    <Route path="/search" element={<SearchPanel />} />
                    <Route path="/addNote" element={<AddNote />} />
                    <Route path="/note/view/:id" element={<ViewNote />} />

                    <Route path="/point/add" element={<AddPoint />} />

                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export { FrontPage };
