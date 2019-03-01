var express = require('express');
var router = express.Router();

const models = require('../models');

const FIND_SIZE = 10;
const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect(301, FRONT_HOST + '/sign');
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
