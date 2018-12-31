var express = require('express');
var request = require('request');
const models = require('../models');
const Op = models.sequelize.Op;

var router = express.Router();

const clientId = "a281614d7f34dc30b665dfcaa3ed7505";

router.get('/seba-choice', function(req, res, next) {
  models.Music.findAll({where: {id: {[Op.lte]:20}}})
  .then(musics => {
    res.json(musics)
  })
})

router.post('/', function(req, res, next) {
  let url = req.body.url;
  request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let apiGet = JSON.parse(body);
      if (user!=null) {
        models.Music.create({
          title: apiGet.title,
          musician: apiGet.user.username,
          musicianImg: apiGet.user.avatar_url,
          description: apiGet.description,
          artworkImg: apiGet.artwork_url,
          duration: apiGet.duration,
          streamUrl: apiGet.stream_url,
          playCount: 0,
          createdAtSoundcloud: apiGet.created_at
        }).then((musics) => res.status(201).json(musics));
      } else {
        models.Music.create({
          title: apiGet.title,
          musician: apiGet.username,
          musicianImg: apiGet.avatar_url,
          description: apiGet.description,
          artworkImg: apiGet.artwork_url,
          duration: apiGet.duration,
          streamUrl: apiGet.stream_url,
          playCount: 0,
          createdAtSoundcloud: apiGet.created_at
        }).then((musics) => res.status(201).json(musics));
      }
    }
  })
})

module.exports = router;