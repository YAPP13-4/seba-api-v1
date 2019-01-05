var express = require('express');
var router = express.Router();

const models = require('../models');

router.get('/', function(req, res, next) {
  models.Featured.findAll()
  .then(featured => res.json(featured));
});

router.post('/', function(req, res, next) {
  const {type, time, music} = req.body;
  models.Featured.create({
    type,
    time,
    music
  }).then((featured) => res.status(201).json(featured));
});

router.get('/:id', function(req,res,next) {
  const musicId = req.params.id;
  models.Featured.findAll({where: {music_id: musicId}})
  .then(featured => res.json(featured));
});
module.exports = router;