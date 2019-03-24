var express = require('express');
var router = express.Router();

const models = require('../models');
const ensureAuthenticated = require('../util/loginAuth');

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

/* GET users listing. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  models.Playlist.findAll().then(users => res.json(users));
});

router.post('/remove/:id', function (req, res, next) {
  const musicId = req.body.musicId || '';

  models.Playlist.destroy({
    where: musicId
  }).then((playlist) => res.status(201).json(playlist))
});

module.exports = router;