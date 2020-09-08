const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  User = require('../../db/models/user'),
  ExtractJwt = require('passport-jwt').ExtractJwt,
  jwt = require('jsonwebtoken');

let jwtOptions = {
  jwtFromRequest: (req) => {
    if (!req.url.includes('/api')) {
      const token = jwt.sign({ react_app: true }, process.env.JWT_SECRET);

      return token;
    }
    let token =
      req?.cookies?.jwt || ExtractJwt.fromAuthHeaderWithScheme('jwt')(req);
    if (token?.includes('++target=')) {
      [token] = token.split('++target=');
    }
    return token;
  },
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    // really not ideal way to get around backend auth
    // for frontend routes
    if (jwtPayload.react_app) {
      return done(null, true);
    }

    if (Date.now() > jwtPayload.expires) {
      return done(null, false, { message: 'jwt expired' });
    }
    let { iat, exp, ...userData } = jwtPayload;
    userData = await User.findById(userData._id);
    return done(null, userData);
  })
);

module.exports = passport;
