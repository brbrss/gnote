const express = require('express');
const router = express.Router();
const Search = require('../model/search');

router.post('/', async function (req, res, next) {
    try {
        const text = req.body.text;
        const tagId = req.params.tagId;
        const x = req.params.x;
        const y = req.params.y;
        const dist = req.params.dist;
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
