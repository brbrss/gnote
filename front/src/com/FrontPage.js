import React, { useState } from 'react';
import { SearchPanel } from "./SearchPanel";
import { AddNote } from './AddNote';

function FrontPage() {
    return (
        <div>
            Front Page
            <AddNote />
            <SearchPanel />
        </div>
    );
}

export { FrontPage };
