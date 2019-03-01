var express = require("express")
var router = express.Router()

const models = require("../models")

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

function ensureAuthenticated(req, res, next) {
  if (NODE_ENV !== 'production') {
    req.user = {
      name: "seba0",
      email: "seba0@gmail.com"
    };
  }
  if (req.isAuthenticated()) { return next(); }
  res.redirect(301, FRONT_HOST + '/sign');
}

router.post('/', ensureAuthenticated, function (req, res, next) {
  const email = req.user.email;
  const musicId = req.body.musicId;
  const type = req.body.type;
  const time = req.body.time / 1000;

  models.User.findOne({
    where: {
      email
    }
  }).then(user => {
    models.Music.findByPk(musicId)
      .then(music => {
        models.Featured.create({
          type,
          time
        }).then(featured => {
          user.addFeatured(featured);
          music.addFeatured(featured);
          res.status(200);
          res.json(featured);
        });
      });
  });
})

router.get('/:id', function (req, res, next) {
  const music_id = req.params.id;
  models.Featured.findAll({ where: { music_id } })
    .then(featured => res.json(featured));
});
module.exports = router;
