import React, { useState } from 'react';
import { SearchPanel } from "./SearchPanel";
import { AddNote } from './AddNote';
import { AddTag } from './tag/AddTag';

function FrontPage() {
    return (
        <div>
            Front Page
            <AddTag />
            <AddNote />
            <SearchPanel />
        </div>
    );
}

export { FrontPage };
