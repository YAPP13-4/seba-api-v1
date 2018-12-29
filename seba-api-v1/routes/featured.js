var express = require('express');
var router = express.Router();

const models = require('../models');

router.get('/', function(req, res, next) {
  models.Featured.findAll()
  .then(featured => res.json(featured));
});

router.post('/', function(req, res, next) {
  const type = req.body.type;
  models.Featured.create({
    type: type
  }).then((featured) => res.status(201).json(featured));
});

router.get('/:id', function(req,res,next) {
  const featuredId = req.params.id;
  models.Featured.findById(featuredId)
  .then(featured => res.json(featured));
});
module.exports = router;