var express = require('express');
var router = express.Router();
var request = require('request');

const models = require('../models');

const UNSPLASH_CLIENT_ID = 'a874e0b6e8fb7dd8b145dc11534f42ed0637b7d513de0451f0f86c4c01d418bf';

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

/* GET users listing. */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 로그인한 User 조회
 *     tags: [User]
 *     parameters:
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           $ref: "#/definitions/User"
 *       404:
 *         description: 비 로그인 상태
 */
router.get('/me', function(req, res, next) {
  if (NODE_ENV !== 'production') {
    req.user = {
      name: 'seba0',
      email: 'seba0@gmail.com'
    };
  }
  if (!req.user) {
    res.status(404);
    res.json({ error: 'user not found' });
    res.end();
    return;
  }
  const email = req.user.email;
  models.User.findOne({ where: { email } }).then(user => res.json(user));
});

/**
 * @swagger
 * /users/musics:
 *   get:
 *     summary: 유저가 등록한 Music list 가져오기
 *     tags: [User]
 *     parameters:
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Music"
 */
router.get('/musics', ensureAuthenticated, function(req, res, next) {
  const email = req.user.email;
  models.Music
    .findAll({
      include: [
        {
          model: models.User,
          required: true,
          where: {
            email
          }
        }
      ]
    })
    .then(musics => {
      res.status(200);
      res.json(musics);
    });
});

/**
 * @swagger
 * /users/featureds:
 *   get:
 *     summary: 유저가 Featured 누를 Music list 가져오기
 *     tags: [User]
 *     parameters:
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Music"
 */
router.get('/featureds', ensureAuthenticated, function(req, res, next) {
  const email = req.user.email;
  models.Music
    .findAll({
      include: [
        {
          model: models.Featured,
          required: true,
          include: [
            {
              model: models.User,
              required: true,
              where: {
                email
              }
            }
          ]
        }
      ]
    })
    .then(musics => {
      res.status(200);
      res.json(musics);
    });
});

/**
 * @swagger
 * /users/playlist:
 *   get:
 *     summary: 유저의 Playlist 가져오기
 *     tags: [User]
 *     parameters:
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Music"
 */
router.get('/playlist', ensureAuthenticated, function(req, res, next) {
  const email = req.user.email;
  models.Music
    .findAll({
      include: [
        {
          model: models.Playlist,
          required: true,
          include: [
            {
              model: models.User,
              required: true,
              where: {
                email
              }
            }
          ]
        }
      ]
    })
    .then(musics => {
      res.status(200);
      res.json(musics);
    });
});

function ensureAuthenticated(req, res, next) {
  if (NODE_ENV !== 'production') {
    req.user = {
      name: 'seba0',
      email: 'seba0@gmail.com'
    };
  }
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(301, FRONT_HOST);
}

/**
 * @swagger

 * /users/unsplash-images:
 *   get:
 *     summary: user등록에 쓸 unsplash image 가져오기
 *     tags: [User]
 *     parameters:
 *       - in: "query"
 *         name: "page"
 *         requried: true
 *         type: "integer"
 *       - in: "query"
 *         name: "keyword"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           type: "object"
 *           properties:
 *             total:
 *               type: "integer"
 *               format: "int64"
 *             totalPages:
 *               type: "integer"
 *             imageUrls:
 *               type: "array"
 *               items:
 *                 type: "string"  
 */
router.get('/unsplash-images', ensureAuthenticated, function(req, res) {
  const keyword = req.query.keyword;
  const page = req.query.page;
  request(
    `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${UNSPLASH_CLIENT_ID}`,
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const { total, total_pages, results } = JSON.parse(body);

        const response = {};
        response.total = total;
        response.totalPages = total_pages;
        response.imageUrls = [];
        results.forEach(result => response.imageUrls.push(result.urls.small));

        res.status(200).json(response);
      }
    }
  );
});

/**
 * @swagger
 
 * /users/name:
 *  put:
 *    summary: mypage에서 아티스트의 name정보 수정
 *    tags: [User]
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        required: true
 *        schema:
 *          type: "object"
 *          properties:
 *            name:
 *              type: "string"
 */

router.put('/name', ensureAuthenticated, function(req, res, next) {
  const email = req.user.email;
  const name = req.user.name;

  models.User
    .update(
      {
        name
      },
      {
        where: {
          email
        }
      }
    )
    .then(result => {
      res.status(200).json(result);
    });
});

/**
 * @swagger
 
 * /users/sns:
 *  put:
 *    summary: mypage의 sns정보 수정
 *    tags: [User]
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        required: true
 *        schema:
 *          type: "object"
 *          properties:
 *            snsFacebook: 
 *              type: "string"
 *            snsInstagram: 
 *              type: "string"
 *            snsTwitter: 
 *              type: "string"
 */

router.put('/sns', ensureAuthenticated, function(req, res, next) {
  const email = req.user.email;
  const snsFacebook = req.body.snsFacebook;
  const snsInstagram = req.body.snsInstagram;
  const snsTwitter = req.body.snsTwitter;

  models.User
    .update(
      {
        snsFacebook: snsFacebook,
        snsInstagram: snsInstagram,
        snsTwitter: snsTwitter
      },
      {
        where: {
          email
        }
      }
    )
    .then(result => {
      res.status(200).json(result);
    });
});

/**
 * @swagger
 
 * /users/background-img:
 *  put:
 *    summary: mypage에서 아티스트의 background image 수정
 *    tags: [User]
 *    parameters:
 *      - in: "body"
 *        name: "body"
 *        required: true
 *        schema:
 *          type: "object"
 *          properties:
 *            background-img:
 *              type: "string"
 */
router.put('/background-img', ensureAuthenticated, function(req, res, next) {
  const backgroundImg = req.body.backgroundImg;
  const email = req.user.email;

  models.User
    .update(
      {
        backgroundImg
      },
      {
        where: {
          email
        }
      }
    )
    .then(user => {
      res.status(200).json(user);
    });
});

module.exports = router;
