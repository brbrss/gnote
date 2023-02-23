// /**
//  * @jest-environment jsdom
//  */

// import React from "react";
// import {expect, jest, test} from '@jest/globals';

// import { render, waitFor, screen } from '@testing-library/react';
// import "@testing-library/jest-dom/extend-expect";
// // import API mocking utilities from Mock Service Worker
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
// import userEvent from '@testing-library/user-event';

// import { TagField } from "./TagField";



// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) => {
//         return res(ctx.status(404))
//     })
// )

// beforeAll(() => {
//     server.listen();
// });
// afterAll(() => {
//     server.close();
// });


// beforeEach(() => {
//     server.resetHandlers();
// });

// afterEach(() => {
// });

// test("render", async () => {
//     let i = 0;
//     const foo = jest.fn();
//     server.use(
//         rest.get('/tag/search/:t', (req, res, ctx) => {
//             foo();
//             i = i + 1;
//             return res(ctx.json(['ar', 'ta', 'tata']));
//         })
//     )
//     const user = userEvent.setup()
//     let elem = render(<TagField />);
//     let input = screen.getByRole('textbox');
//     await user.click(input);
//     await user.keyboard('a');
//     await waitFor(() => { expect(foo).toHaveBeenCalledTimes(1) })
//     expect(i).toBe(1);
//     expect(screen.getByText('ta')).toBeInTheDocument();
// });

