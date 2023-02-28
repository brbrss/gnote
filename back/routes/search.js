const express = require('express');
const router = express.Router();
const Search = require('../model/search');


function validTagId(tagId) {
    return tagId !== '' && tagId !== null && Number.isInteger(Number(tagId));
}

router.post('/', async function (req, res, next) {
    try {
        const text = req.body.text;
        const tagId = req.body.tagId;
        const x = req.body.lon;
        const y = req.body.lat;
        const dist = req.body.radius;
        const timeStart = req.body.timeStart;
        const timeEnd = req.body.timeEnd;
        const param = {};
        if (text) {
            param['text'] = text;
        }
        if (tagId && tagId.every(validTagId)) {
            param['tag'] = tagId;
        }
        if (dist) {
            param['wdist'] = { x, y, dist };
        }
        if (timeStart) {
            param['timeStart'] = timeStart;
        } if (timeEnd) {
            param['timeEnd'] = timeEnd;
        }
        const data = await Search.search(param);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
