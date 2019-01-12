var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Playlist.findAll().then(users => res.json(users));
});

router.post('/', function(req, res, next) {
  const userId = req.body.userId || '';
  const user = models.User.findById(userId);

  models.Playlist
    .create(
      {
        user: user
      },
      {
        include: models.User
      }
    )
    .then(playlist => res.status(201).json(playlist));
});

module.exports = router;
