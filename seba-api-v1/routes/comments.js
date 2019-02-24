var express = require('express');
var router = express.Router();

const models = require('../models');

const FIND_SIZE = 10;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

router.get('/', function (req, res, next) {
  const pageNum = req.query.page; // 요청 페이지 넘버
  let offset = 0;

  if (pageNum > 1) {
    offset = FIND_SIZE * (pageNum - 1);
  }

  models.Comment
    .findAll({
      offset: offset,
      limit: FIND_SIZE,
      include: [
        {
          model: models.User,
          required: true
        }
      ]
    })
    .then(comments => res.json(comments));
});

router.post('/', ensureAuthenticated, function (req, res, next) {
  const { content, selected_time, user } = req.body;
  models.Comment
    .create({
      content,
      selectedTime: selected_time,
      user
    })
    .then(comments => res.status(201).json(comments));
});

router.get('/:id', function (req, res, next) {
  const commentId = req.params.id;
  models.Comment.findById(commentId).then(comments => res.json(comments));
});
module.exports = router;
