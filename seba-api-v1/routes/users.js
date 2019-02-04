var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  models.User.findAll().then(users => res.json(users));
});

router.post('/', function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;

  models.User
    .create(
      {
        name: name,
        email: email,
        playlist: {}
      },
      { include: models.Playlist }
    )
    .then(user => res.status(201).json(user));
});

module.exports = router;
