var express = require('express');
var request = require('request');
const models = require('../models')

var router = express.Routconst

const clientId = "a281614d7f34dc30b665dfcaa3ed7505";

// router.get('/', function(req, res, next) {
//   models.Music.findAll()
//   .then(musics => res.json(musics))
// })

router.post('/', function(req, res, next) {
  let url = req.body.url;
  request(`https://api.soundcloud.com/resolve.json?url=${url}&client_id=${clientId}`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let apiGet = JSON.parse(body);
      models.Music.create({
        title: apiGet.title,
        musician: apiGet.user.username,
        musician_img: apiGet.user.avatar_url,
        description: apiGet.description,
        artwork_img: apiGet.artwork_url,
        duration: apiGet.duration,
        stream_url: apiGet.stream_url,
        play_count: 0,
        created_at_soundcloud: apiGet.created_at
      }).then((musics) => res.status(201).json(musics));
    }
  })
})