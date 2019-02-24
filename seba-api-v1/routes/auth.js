var express = require('express');
var router = express.Router();

var passportFacebook = require('../auth/facebook');

const models = require('../models');

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
                    res.redirect('/musics/seba-choice');
                } else {
                    res.redirect('/signup');
                }
            });
    });

module.exports = router;