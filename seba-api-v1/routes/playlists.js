var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Playlist.findAll().then(users => res.json(users));
});

module.exports = router;
