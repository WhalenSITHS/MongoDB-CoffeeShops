const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config({ path: "variables.env" }); //get secret key
// load up the user model
const User = require("../Models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.SECRET}`,
  algorithms: ["RS256"],
};

module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      console.log(jwt_payload);

      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};

module.exports = async function generateToken(user) {
  const _id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, `${process.env.SECRET}`, {
    expiresIn: expiresIn,
  });
  console.log(signedToken);
  const token = "Bearer " + signedToken;
  return token;
};
