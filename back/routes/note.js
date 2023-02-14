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
router.put('/', async function (req, res, next) {
    try {
        const text = req.body.text;
        const geo = req.body.geo;
        const time = req.body.time;
        const id = await Note.add(text, geo, time);
        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
});

/**
 * response
 * 
 * rowCount number of records affected
 */
router.post('/', async function (req, res, next) {
    try {
        const id = req.body.id;
        const text = req.body.text;
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
router.delete('/', async function (req, res, next) {
    try {
        const id = req.body.id;
        const rowCount = await Note.delete(id);
        res.status(200).json({ rowCount });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
