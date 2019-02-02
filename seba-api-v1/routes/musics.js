var express = require('express');
var request = require('request');
const models = require('../models');
const Op = models.sequelize.Op;

var router = express.Router();

const clientId = 'a281614d7f34dc30b665dfcaa3ed7505';

router.get('/seba-choice', function(req, res, next) {
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

router.get('/register-form', function(req, res) {
  const url = req.query.url;
  request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const { title, user, description, artwork_url } = JSON.parse(body);
      console.log(title);
      res.status(200).json({
        title: title,
        musician: user.username,
        description: description,
        artworkImg: artwork_url
      })
    } else {
      res.sendStatus(404);
    }
  });
});

router.post('/', function(req, res, next) {
  let url = req.body.url;
  request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const { title, user, description, artwork_url, duration, stream_url, created_at } = JSON.parse(body);

      models.Music.findAll({ where: { title: title, musician: user.username } }).then(ovelapChecked).then(dataUpdated);
      function ovelapChecked(musics) {
        if (musics.length === 0) {
          return false;
        } else {
          return true;
        }
      }
      function dataUpdated(status) {
        if (!status) {
          models.Music
            .create({
              title: title,
              musician: user.username,
              musicianImg: user.avatar_url,
              description: description,
              artworkImg: artwork_url,
              duration: duration,
              streamUrl: stream_url,
              playCount: 0,
              createdAtSoundcloud: created_at
            })
            .then(music => res.status(201).json(music));
        } else {
          res.sendStatus(500);
        }
      }
    }
  });
});

router.get('/:id', function(req, res, next) {
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
