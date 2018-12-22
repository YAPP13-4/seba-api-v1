var express = require('express');
var router = express.Router();

const models = require('../models');

router.get('/', function(req, res, next) {
  models.Comment.findAll()
  .then(comments => res.json(comments));
});

router.post('/', function(req, res, next) {
  const content = req.body.content;
  models.Comment.create({
    content: content
  }).then((comments) => res.status(201).json(comments));
});

router.get('/:id', function(req,res,next) {
  const commentId = req.params.id;
  models.Comment.findById(commentId)
  .then(comments => res.json(comments));
});
module.exports = router;