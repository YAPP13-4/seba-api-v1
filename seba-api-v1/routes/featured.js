var express = require("express")
var router = express.Router()

const models = require("../models")

Object.filter = (obj, predicate) =>
  Object.keys(obj)
  .filter(key => predicate(obj[key]))
  .reduce((res, key) => (res[key] = obj[key], res), {});

router.get("/", function (req, res, next) {
  models.Featured.findAll().then(featured => res.json(featured))
})

router.post("/", function (req, res, next) {
  const {
    type,
    music
  } = req.body
  let time = req.body.time
  time = time / 1000
  models.Featured.create({
    type,
    time,
    music
  }).then(featured => res.status(201).json(featured))
})

router.get("/:id", function (req, res, next) {
  const music_id = req.params.id
  models.Featured.findAll({
    where: {
      music_id
    }
  }).then(featured => res.json(featured))
})
module.exports = router