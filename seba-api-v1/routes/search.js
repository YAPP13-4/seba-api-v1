var express = require('express');
var models = require('../models');
var sequelize = require('sequelize');
var Op = sequelize.Op;

var router = express.Router();

/**
 *  @swagger
 * /search/title/{searchText}:
 *   get:
 *     summary: 제목 기반 검색 결과
 *     tags: [Search]
 *     parameters:
 *      - in: "path"
 *        name: "searchText"
 *        required: true
 *
 */

// 곡 제목을 기반으로 하는 검색 기능 구현
router.get('/title/:searchText', function(req, res, next) {
  let searchText = req.params.searchText;
  console.log(searchText);

  models.Music.findAll({
    attributes: ['title', 'musician', 'duration', 'play_count'],
    where: {
      title: {
        [Op.like]: '%' + searchText + '%'
      }
    }
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;
