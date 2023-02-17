const express = require('express');
const router = express.Router();
const Point = require('../model/point');

router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const point = await Point.find(id);
        res.json(point);
    } catch (err) {
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        let name = req.body.name;
        let lon = req.body.lon;
        let lat = req.body.lat;
        let comment = req.body.comment;
        const id = await Point.add(name ? name : '', lon, lat, comment ? comment : '');
        //let id = 12345;
        res.json({ id: id });
    } catch (err) {
        next(err);
    }
});

router.get('/all/', async function (req, res, next) {
    try {
        let offset = req.body.offset;
        let limit = req.body.limit;
        offset = offset ? offset : 0;
        limit = limit ? limit : 10;
        const rows = await Point.all(0, 10);
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
