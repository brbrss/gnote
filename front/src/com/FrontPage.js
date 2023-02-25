import React, { useState } from 'react';
import { SearchPanel } from "./SearchPanel";
import { AddNote } from './note/AddNote';
import { AddTag } from './tag/AddTag';
import { AllTag } from './tag/AllTag';
import { Routes, Route, useParams } from "react-router-dom";
import { ViewNote } from './note/ViewNote';
import { Link } from "react-router-dom";
import { Point } from './point';

function Nav(props) {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/tag">Tag List</Link>
            <Link to="/addtag">Add Tag</Link>
            <Link to="/search">Search</Link>
            <Link to="/addNote">Add Note</Link>
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

                <Route path="/point" element={<Point />} />

            </Routes>
        </div>
    );
}

export { FrontPage };
