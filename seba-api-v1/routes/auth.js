var express = require('express');
var router = express.Router();

var passportFacebook = require('../auth/facebook');
var passportKakao = require('../auth/kakao');

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

        models.user.findOne({
            where: {
                email
            }
        }).then(user => {
            if (user) {
                res.redirect(FRONT_HOST + '/main')
            } else {
                models.User.create(
                    {
                        name: name,
                        email: email,
                        playlist: {}
                    },
                    { include: models.Playlist }
                ).then(user => res.redirect(FRONT_HOST + '/main'));
            }
        })
    });


/* KAKAO ROUTER */
router.get('/kakao',
    passportKakao.authenticate('kakao'));

router.get('/oauth/kakao/callback',
    passportKakao.authenticate('kakao', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('000000000000000', req)
        // const name = req.user.name;
        // const email = req.user.email;

        // models.user.findOne({
        //     where: {
        //         email
        //     }
        // }).then(user => {
        //     if (user) {
        //         res.redirect(FRONT_HOST + '/main')
        //     } else {
        //         models.User.create(
        //             {
        //                 name: name,
        //                 email: email,
        //                 playlist: {}
        //             },
        //             { include: models.Playlist }
        //         ).then(user => res.redirect(FRONT_HOST + '/main'));
        //     }
        // })
    });

module.exports = router;