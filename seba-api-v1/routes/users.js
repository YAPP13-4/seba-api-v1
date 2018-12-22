var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then((users) => res.json(users));
});

router.post('/', function(req, res, next) {
  const name = req.body.name;
  console.log(name);
  const email = req.body.email;
  console.log(email);

  models.User.create({
    name: name,
    email: email
    }).then((user) => res.status(201).json(user))
});

module.exports = router;
