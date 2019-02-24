var express = require('express');
var router = express.Router();

const models = require('../models');

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect(301, FRONT_HOST + '/sign');
}

/* GET users listing. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  models.Playlist.findAll().then(users => res.json(users));
});

module.exports = router;
