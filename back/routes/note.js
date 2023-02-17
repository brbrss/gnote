const express = require('express');
const router = express.Router();

const Note = require('../model/note');

router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = await Note.find(id);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

/**
 * response
 * 
 * id id of created record
 */
router.post('/', async function (req, res, next) {
    try {
        const content = req.body.content;
        const geo = req.body.geo;
        const time = req.body.time;
        const id = await Note.add(content, geo, time);
        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
});

/**
 * response
 * 
 * rowCount number of records affected,
 * should be 1 or 0
 */
router.put('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const text = req.body.content;
        const geo = req.body.geo;
        const time = req.body.time;
        const rowCount = await Note.update(id, text, geo, time);
        res.status(200).json({ rowCount });
    } catch (err) {
        next(err);
    }
});


/**
 * response
 * 
 * rowCount number of records deleted
 */
router.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const rowCount = await Note.delete(id);
        res.status(200).json({ rowCount });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
