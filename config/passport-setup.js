const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "secret.env" });
const User = require("../Models/User");

/* passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: `${process.env.clientID}`,
      clientSecret: `${process.env.clientSecret}`,
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id, username: profile.displayName })
        .save()
        .then((newUser) => {
          console.log(`new user created ${newUser}`);
        });
    }
  )
);
 */
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: `${process.env.clientID}`,
      clientSecret: `${process.env.clientSecret}` /* add your client secret here */,
    },
    async function (accessToken, refreshToken, profile, done) {
      // passport callback function

      const currentUser = await User.findOne({ googleId: profile.id });
      if (currentUser) {
        console.log("user exists");
      } else {
        try {
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
          });
          await newUser.save();
          console.log(`new user created ${newUser}`);
        } catch (error) {
          console.log(error);
        }
      }
    }
  )
);
