/**
 * @jest-environment jsdom
 */

import React from "react";
//import { render, unmountComponentAtNode } from "react-dom";
//import { act } from "react-dom/test-utils";
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import { NoteCard } from "./NoteCard";


beforeEach(() => {

});

afterEach(() => {

});

test("render", () => {
    render(<NoteCard content="O I see." tagList={['red', 'blue']} time={new Date(1234, 5, 6)} />);

    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('Time added:')).toBeInTheDocument();
});

test("no time", () => {
    render(<NoteCard content="O I see." tagList={['red', 'blue']} time={null} />);


    expect(screen.queryByText('Time added:')).not.toBeInTheDocument();
});
