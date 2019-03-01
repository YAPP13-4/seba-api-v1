var express = require('express');
var request = require('request');
const models = require('../models');
const Op = models.sequelize.Op;

var router = express.Router();

const clientId = 'a281614d7f34dc30b665dfcaa3ed7505';

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

const FIND_SIZE = 10;

function ensureAuthenticated(req, res, next) {
  if (NODE_ENV !== 'production') {
    req.user = {
      name: "seba0",
      email: "seba0@gmail.com"
    };
  }
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(301, FRONT_HOST + '/sign');
}

/**
 * @swagger
 * /musics/seba-choice:
 *   get:
 *     summary: seba's 추천 음악 리스트 가져오기
 *     tags: [Music]
 *     parameters:
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Music"
 */
router.get('/seba-choice', function (req, res, next) {

  models.Music
    .findAll({
      where: {
        id: {
          [Op.lte]: 20
        }
      },
      include: [{
        model: models.Featured,
        required: false
      }]
    })
    .then(musics => {
      res.json(musics);
    });
});

/**
 * @swagger

 * /musics/register-form:
 *   get:
 *     summary: url로 등록할 music data 가져오기
 *     tags: [Music]
 *     parameters:
 *       - in: "query"
 *         name: url
 *         requried: true
 *         type: string
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           $ref: "#/definitions/MusicRegisterForm"
 *       400:
 *         description: 이미 등록된 url 입력
 */
router.get('/register-form', ensureAuthenticated, function (req, res) {

  const url = req.query.url;
  models.Music
    .findOne({
      where: {
        url: url
      }
    })
    .then(music => {
      if (music) {
        res.status(400).json({
          error: '이미 존재하는 url 입니다'
        });
      } else {
        request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function (
          error,
          response,
          body
        ) {
          if (!error && response.statusCode === 200) {
            const {
              title,
              user,
              description,
              artwork_url
            } = JSON.parse(body);
            res.status(200).json({
              title: title,
              musician: user.username,
              description: description,
              artworkImg: artwork_url
            });
          }
        });
      }
    });
});

/**
 * @swagger
 * /musics:
 *   post:
 *     summary: 음악 등록
 *     tags: [Music]
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "music 등록 body"
 *         required: true
 *         schema: 
 *           $ref: "#/definitions/MusicRegisterForm"
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           $ref: "#/definitions/Music"
 *       400:
 *         description: 이미 존재하는 음악 url 입력
 *       403:
 *         description: 미 로그인 유저의 요청
 *       404:
 *         description: 음악정보가 없는 url 입력
 */

router.post('/', ensureAuthenticated, function (req, res, next) {
  const url = req.body.url;

  const curUser = req.user;

  models.User.findOne({ where: { email: curUser.email } }).then(dbUser => {
    models.Music
      .findOne({
        where: { url: url }
      })
      .then(music => {
        if (music) {
          res.status(400).json({ error: '이미 존재하는 url 입니다' });
        } else {
          request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function (
            error,
            response,
            body
          ) {
            if (!error && response.statusCode === 200) {
              let { title, user, description, artwork_url, duration, stream_url, created_at } = JSON.parse(body);

              title = req.body.title ? req.body.title : title;
              user.username = req.body.musician ? req.body.musician : user.username;
              description = req.body.description ? req.body.description : description;
              artwork_url = req.body.artworkImg ? req.body.artworkImg : artwork_url;

              models.Music
                .create({
                  title: title,
                  musician: user.username,
                  musicianImg: user.avatar_url,
                  description: description,
                  lylic: req.body.lylic,
                  artworkImg: artwork_url,
                  duration: duration,
                  url: url,
                  streamUrl: stream_url,
                  playCount: 0,
                  createdAtSoundcloud: created_at
                })
                .then(music => {
                  dbUser.addMusic(music);
                  res.status(201).json(music);
                });
            } else {
              res.status(404).json({ error: '유효하지 않은 url입니다.' });
            }
          });
        }
      });
  });
});

/**
 * @swagger
 * /musics/{id}:
 *   get:
 *     summary: 음악 상세 data
 *     tags: [Music]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         requried: true
 *         type: "integer"
 *         format: "int64"
 *     responses:
 *       200:
 *         description: 성공
 *         schema:
 *           $ref: "#/definitions/MusicDetail"
 *       404:
 *         description: 해당 음악이 없음
 */

router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  const result = {};

  models.Music.findByPk(id).then(music => {
    if (!music) {
      res.status(404).json({
        error: '해당 음악이 없습니다.'
      });
      return;
    }
    result.music = music;
    models.Featured
      .findAll({
        where: {
          music_id: id
        },
        attributes: ['type', [models.sequelize.fn('count', models.sequelize.col('type')), 'count']],
        group: ['type']
      })
      .then(featureds => {
        result.featureds = featureds;
        res.status(200).json(result);
      });
  });
});


router.get("/rank/featured", function (req, res, next) {
  const musicType = req.query.type;
  models.Featured.findAll({
    where: {
      type: musicType
    },
    include: {
      model: models.Music,
      required: true
    },
    raw: true
  })
    .then(featured => {
      res.json(featured)
    });
});

router.get('/:id/comments', function (req, res, next) {
  const musicId = req.params.id;
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
      ],
      where: {
        musicId
      }
    })
    .then(comments => {
      models.Comment
        .count({
          where: {
            musicId
          }
        })
        .then(commentsCount => res.json({ commentsCount, comments }));
    });
});

module.exports = router;
