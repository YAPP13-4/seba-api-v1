var express = require('express');
var request = require('request');
const models = require('../models');
const Op = models.sequelize.Op;

var router = express.Router();

const clientId = 'a281614d7f34dc30b665dfcaa3ed7505';

router.get('/seba-choice', function (req, res, next) {
  models.Music
    .findAll({
      where: {
        id: { [Op.lte]: 20 }
      },
      include: [
        {
          model: models.Featured,
          required: false
        }
      ]
    })
    .then(musics => {
      res.json(musics);
    });
});

router.get('/register-form', function (req, res) {
  const url = req.query.url;
  models.Music.findOne({
    where: { url: url }
  }).then(music => {
    if (music) {
      res.status(400).json({ error: '이미 존재하는 url 입니다' });
    } else {
      request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const { title, user, description, artwork_url } = JSON.parse(body);
          res.status(200).json({
            title: title,
            musician: user.username,
            description: description,
            artworkImg: artwork_url
          })
        } else {
          res.status(404).json({ error: '유효하지 않은 url입니다.' });
        }
      });
    }
  });
});

router.post('/', function (req, res, next) {
  const url = req.body.url;

  models.Music.findOne({
    where: { url: url }
  }).then(music => {
    if (music) {
      res.status(400).json({ error: '이미 존재하는 url 입니다' });
    } else {
      request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function (error, response, body) {
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
            .then(music => res.status(201).json(music));
        } else {
          res.status(404).json({ error: '유효하지 않은 url입니다.' });
        }
      });
    }
  })
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  models.Music
    .findByPk(id, {
      include: [
        {
          model: models.Featured,
          required: false
        },
        {
          model: models.Comment,
          required: false
        }
      ]
    })
    .then(music => {
      res.json(music);
    });
});

module.exports = router;
