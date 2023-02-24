import React from 'react';
import { FrontPage } from './com/FrontPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<FrontPage />} />
                </Routes>
            </BrowserRouter >
        </div>
    );
}


export { App };
