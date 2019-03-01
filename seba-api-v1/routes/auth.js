var express = require('express');
var router = express.Router();

var passportFacebook = require('../auth/facebook');

const models = require('../models');

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

/* FACEBOOK ROUTER */
router.get('/facebook',
    passportFacebook.authenticate('facebook', { scope: ['name', 'email'] }));

router.get('/facebook/callback',
    passportFacebook.authenticate('facebook', { scope: ['name', 'email'], failureRedirect: '/login' }),
    function (req, res) {
        const name = req.user.name;
        const email = req.user.email;

        models.User.create(
            {
                name: name,
                email: email,
                playlist: {}
            },
            { include: models.Playlist }
        ).then(user => res.status(201).json(user));
    });

module.exports = router;