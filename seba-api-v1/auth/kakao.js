var passport = require('passport');
var KakaoStrategy = require('passport-kakao').Strategy;

const KAKAO_CLIENT_ID = '3b285a582ec849d2a31e37f3fb0e9949';
const NODE_ENV = process.env.NODE_ENV;
const HOST_URL = NODE_ENV === 'production' ? 'https://seba-api.cf' : 'http://localhost:6508';
const CALLBACK_URL = HOST_URL + '/auth/oauth';
 
passport.use('kakao', new KakaoStrategy({
    clientID : KAKAO_CLIENT_ID,
    callbackURL : CALLBACK_URL,
    profileFields: ['email', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

module.exports = passport;