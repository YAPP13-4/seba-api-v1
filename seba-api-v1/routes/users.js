var express = require('express');
var router = express.Router();
var request = require('request');

const models = require('../models');

const UNSPLASH_CLIENT_ID = 'a874e0b6e8fb7dd8b145dc11534f42ed0637b7d513de0451f0f86c4c01d418bf';

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
 *           type: "array"
 *           items:
 *             type: "string"
 */
router.get('/unsplash-images', function (req, res) {
  const keyword = req.query.keyword;
  const page = req.query.page;
  request(`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${UNSPLASH_CLIENT_ID}`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const { results } = JSON.parse(body);

      const imageList = [];
      results.forEach(result => imageList.push(result.urls.small));

      res.status(200).json(imageList);
    }
  });
});

module.exports = router;
