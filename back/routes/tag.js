const express = require('express');
const router = express.Router();
const val = require('validator');
const Tag = require('../model/tag');
var createError = require('http-errors');




function validTag(name, description, parent) {
    const a = typeof name === 'string'
        && typeof description === 'string'
        && typeof parent === 'string'

        && !val.isEmpty(name)
        && (val.isInt(parent) || val.isEmpty(parent))
        ;
    return a;
}

router.get('/search/', async function (req, res, next) {
    try {
        throw createError(400, 'Requires input text');
    } catch (err) {
        next(err);
    }
});

router.get('/search/:t', async function (req, res, next) {
    try {
        const t = req.params.t;
        const data = await Tag.textSearch(t, 10);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/all/', async function (req, res, next) {
    try {
        const t = '';
        const data = await Tag.textSearch(t, 10);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = await Tag.find(id);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/note/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const data = await Tag.findByNote(id);
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
        const name = req.body.name;
        const description = req.body.description;
        const parent = '' + req.body.parent;
        if (!validTag(name, description, parent)) {
            throw createError(400, 'Invalid input');
        }
        const id = await Tag.add(name, description, parent);
        res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
