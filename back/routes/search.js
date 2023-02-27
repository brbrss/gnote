const express = require('express');
const router = express.Router();
const Search = require('../model/search');

router.post('/', async function (req, res, next) {
    try {
        const text = req.body.text;
        const tagId = req.body.tagId;
        const x = req.body.x;
        const y = req.body.y;
        const dist = req.body.dist;
        const param = {};
        if (text) {
            param['text'] = text;
        }
        if (tagId !== '' && tagId !== null && Number.isInteger(Number(tagId))) {
            param['tag'] = tagId;
        }
        if (dist) {
            param['wdist'] = { x, y, dist };
        }
        const data = await Search.search(param);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
