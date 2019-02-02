var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
    models.Playlist.findAll().then(users => res.json(users));
});

router.post('/remove/:id', function (req, res, next) {
    const musicId = req.body.musicId || '';

    models.Playlist.destroy({
        where: musicId
    }).then((playlist) => res.status(201).json(playlist))
});

module.exports = router;