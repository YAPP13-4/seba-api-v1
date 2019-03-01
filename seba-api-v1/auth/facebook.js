var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

const models = require('../models');

const FACEBOOK_CLIENT_ID = '2260580430852098';
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const HOST_URL = NODE_ENV === 'production' ? 'https://seba-api.cf' : 'http://localhost:6508';
const CALLBACK_URL = HOST_URL + '/auth/facebook/callback';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    profileFields: ['id', 'email', 'name']
}, function (accessToken, refreshToken, profile, done) {
    const email = profile._json.email;
    done(null, { email, accessToken, refreshToken });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;