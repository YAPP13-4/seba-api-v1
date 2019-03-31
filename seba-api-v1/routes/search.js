var express = require('express');
var models = require('../models');
var sequelize = require('sequelize');
var Op = sequelize.Op;

var router = express.Router();

/**
 *  @swagger
 * /search/all/{searchText}:
 *   get:
 *     summary: 전체 검색 결과
 *     tags: [Search]
 *     parameters:
 *      - in: "path"
 *        name: "searchText"
 *        required: true
 *
 */
router.get('/all/:searchText', function(req, res, next) {
  let searchText = req.params.searchText;

  models.Music.findAll({
    where: {
      [Op.or]: [
        {
          musician: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          title: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        {
          lylic: {
            [Op.like]: '%' + searchText + '%'
          }
        }
      ]
    }
  }).then(result => {
    res.json(result);
  });
});

/**
 *  @swagger
 * /search/musician/{searchText}:
 *   get:
 *     summary: 뮤지션 기반 검색 결과
 *     tags: [Search]
 *     parameters:
 *      - in: "path"
 *        name: "searchText"
 *        required: true
 *
 */

router.get('/musician/:searchText', function(req, res, next) {
  let searchText = req.params.searchText;

  models.Music.findAll({
    where: {
      musician: {
        [Op.like]: '%' + searchText + '%'
      }
    }
  }).then(result => {
    res.json(result);
  });
});

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

router.get('/title/:searchText', function(req, res, next) {
  let searchText = req.params.searchText;

  models.Music.findAll({
    where: {
      title: {
        [Op.like]: '%' + searchText + '%'
      }
    }
  }).then(result => {
    res.json(result);
  });
});

/**
 *  @swagger
 * /search/lyric/{searchText}:
 *   get:
 *     summary: 가사 기반 검색 결과
 *     tags: [Search]
 *     parameters:
 *      - in: "path"
 *        name: "searchText"
 *        required: true
 *
 */

router.get('/lyric/:searchText', function(req, res, next) {
  let searchText = req.params.searchText;

  models.Music.findAll({
    where: {
      lylic: {
        [Op.like]: '%' + searchText + '%'
      }
    }
  }).then(result => {
    res.json(result);
  });
});

module.exports = router;
