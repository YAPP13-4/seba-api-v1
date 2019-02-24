var express = require('express');
var router = express.Router();

const models = require('../models');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

/* GET users listing. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  models.Playlist.findAll().then(users => res.json(users));
});

module.exports = router;
