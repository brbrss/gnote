import React, { useState } from 'react';
import { SearchPanel } from "./SearchPanel";
import { AddNote } from './note/AddNote';
import { AddTag } from './tag/AddTag';
import { AllTag } from './tag/AllTag';
import { Routes, Route, useParams } from "react-router-dom";
import { ViewNote } from './note/ViewNote';
import { Link } from "react-router-dom";
import { AddPoint } from './Addpoint';
import { AllPoint } from './point/AllPoint';



function Nav(props) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tag">Tag List</Link>
            <Link to="/addtag">Add Tag</Link>
            <Link to="/search">Search</Link>
            <Link to="/addNote">Add Note</Link>
            <Link to="/point/add">Add Point</Link>
            <Link to="/point/all">All Point</Link>
        </nav>
    );
}


function FrontPage() {
    return (
        <div>
            Front Page
            <Nav />

            <Routes>
                <Route path="/tag" element={<AllTag />} />
                <Route path="/addtag" element={<AddTag />} />

                <Route path="/search" element={<SearchPanel />} />
                <Route path="/addNote" element={<AddNote />} />
                <Route path="/note/view/:id" element={<ViewNote />} />

                <Route path="/point/add" element={<AddPoint />} />
                <Route path="/point/all" element={<AllPoint />} />

            </Routes>
        </div>
    );
}

export { FrontPage };
