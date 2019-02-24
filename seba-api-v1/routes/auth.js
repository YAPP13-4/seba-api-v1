var express = require('express');
var router = express.Router();

var passportFacebook = require('../auth/facebook');

const models = require('../models');

const NODE_ENV = process.env.NODE_ENV;
const FRONT_HOST = NODE_ENV === 'production' ? 'https://semibasement.com' : 'http://localhost:3000';

/* FACEBOOK ROUTER */
router.get('/facebook',
    passportFacebook.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback',
    passportFacebook.authenticate('facebook', { scope: 'email', failureRedirect: '/login' }),
    function (req, res) {
        const userEmail = req.user.email;
        models.User.findOne({ where: { email: userEmail } })
            .then(user => {
                if (user) {
                    res.redirect(301, FRONT_HOST + '/musics/seba-choice');
                } else {
                    res.redirect(301, FRONT_HOST + '/signup');
                }
            });
    });

module.exports = router;